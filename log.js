var fs = require('fs-extra');
var tracer = require('tracer');
var colors = require('colors');

var conf = {
  dir: './log/',
  level: 0, // write into files when method rank greater than record_level
  methods: {
    log: { color: 'white', rank: '0'},
    info: { color: 'green', rank: '1'},
    trace: { color: 'cyan', rank: '2'},
    debug: { color: 'blue', rank: '3'},
    warn: { color: 'yellow', rank: '4'},
    error: { color: 'red', rank: '5'},
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
  var dir = opt.dir || conf.dir;

  /*log methods*/
  var methods = opt.methods || conf.methods;

  /*record_level*/
  var level = opt.level || conf.level;

  var formats = {}
  Object.keys(opt.methods).map(function (method) {
    formats[method] = opt.methods[method]["format"];
  });

  /*init dir*/
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, 0o777);
    }
    for (var key in methods) {
      if (!fs.existsSync(dir + key))  fs.mkdirSync(dir + key, 0o777);
    }
  } catch (e) {
    if(e) {
      console.log('logger init error:', e);
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
          var logPath = dir + data.title + "/" + data.timestamp.substring(0, 10) + ".log"
          var writeStream = fs.createWriteStream(logPath, {
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

module.exports = logger;