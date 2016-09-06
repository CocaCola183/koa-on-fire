import fs from 'fs';
import tracer from 'tracer';
import colors from 'colors';
import conf from './config.json';

/**
 * logger
 * @param  opt options for logger
 * @return logger
 */
function logger(opt) {
  opt = opt || {};

  let env = opt.env || 'dev';

  /*log dir*/
  let dir = opt.dir || conf.dir;

  /*log methods*/
  let methods = opt.methods || conf.methods;

  /*record_level*/
  // let level = opt.level || conf.level;

  let formats = {}
  Object.keys(methods).map(function (method) {
    formats[method] = methods[method]["format"];
  });


  try {
    if (fs.statSync(`${process.cwd()}/${dir}`).isDirectory()) {

    }
  } catch (e) {
    console.log(e);
  }

  /*init dir*/
  for (let key in methods) {
    try {
      if (!fs.statSync(`${process.cwd()}/${dir}/${key}`).isDirectory()) {
        throws(new Error('dir not exist'));
      }
    } 
    catch (e){
      try {
        fs.mkdirSync(`${process.cwd()}/${dir}/${key}`)
      }
      catch (e) {
        console.log('init log dir failed.');
      }
    }
  }

  /*logger*/
  return tracer.console({
    format: [
              "[{{timestamp}}] <{{file}}:{{line}}> {{message}}",
              formats
            ],
    dateformat: "yyyy-mm-dd HH:MM:ss",
    methods: Object.keys(methods),
    transport: function (data) {
      try {
        // log in console
        if (process.env.env === 'dev' || (methods[data.title] && methods[data.title].print)) {
          if (data.output[methods[data.title].color]) {
            console.log(data.output[methods[data.title].color]);
          } else {
            console.log(data.output)
          }
        }
        // backup to files
        if (process.env.env != 'dev' && methods[data.title] && methods[data.title].backup) {
          const logPath = `${dir}/${data.title}/${data.timestamp.substring(0, 10)}.log`;
          const writeStream = fs.createWriteStream(logPath, {
              flags: "a",
              encoding: "utf8",
              mode: 0o666,  
              autoClose: true
          });
          writeStream.write(data.output + "\n");
          writeStream.end();
        }
      } catch (e) {
        console.log('logger error', e);
      }
    }
  });

}

export default logger;