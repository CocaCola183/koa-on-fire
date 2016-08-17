import fs from 'fs';
import tracer from 'tracer';
import colors from 'colors';
import config from '../../../config.json';

let conf = {
  dir: './log',
  level: 0, // write into files when method rank greater than record_level
  methods: {
    log: {
      color: 'white', 
      rank: '0'
    },
    info: { 
      color: 'green', 
      rank: '1'
    },
    trace: { 
      color: 'cyan', 
      rank: '2'
    },
    debug: { 
      color: 'blue', 
      rank: '3'
    },
    warn: { 
      color: 'yellow', 
      rank: '4'
    },
    error: { 
      color: 'red', 
      rank: '5'
    }
  }
}

/**
 * logger
 * @param  opt options for logger
 * @return logger
 */
function logger(opt) {
  opt = opt || {};

  /*log dir*/
  let dir = opt.dir || conf.dir;

  /*log methods*/
  let methods = opt.methods || conf.methods;

  /*record_level*/
  let level = opt.level || conf.level;

  let formats = {}
  Object.keys(opt.methods).map(function (method) {
    formats[method] = opt.methods[method]["format"];
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
    level: 0,
    format: [
              "{{timestamp}} {{file}}:{{line}} {{message}}",
              formats
            ],
    dateformat: "yyyy-mm-dd HH:MM:ss",
    methods: Object.keys(methods),
    transport: function (data) {
      try {
        if (data.output[methods[data.title].color]) {
          console.log(data.output[methods[data.title].color]);
        } else {
          console.log(data.output)
        }
        if (data.level >= level) {
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