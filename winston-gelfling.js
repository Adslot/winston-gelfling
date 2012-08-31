(function() {
  var Gelfling, winston,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  winston = require('winston');

  exports.Gelfling = winston.transports.Gelfling = Gelfling = (function(_super) {

    __extends(Gelfling, _super);

    function Gelfling(options) {
      this.name = 'gelfling';
      this.level = options.level || 'info';
      this.silent = options.silent || false;
      this.handleExceptions = options.handleExceptions || false;
      this.graylogHost = options.graylogHost || 'localhost';
      this.graylogPort = options.graylogPort || 12201;
      this.graylogHostname = options.graylogHostname || require('os').hostname();
      this.graylogFacility = options.graylogFacility || 'nodejs';
      this.graylogSequence = 0;
      this.gelfling = require('gelfling')(this.graylogHost, this.graylogPort, {
        defaults: {
          facility: this.graylogFacility
        }
      });
    }

    Gelfling.prototype.getMessageLevel = function(winstonLevel) {
      var mappings;
      mappings = {
        verbose: 7,
        silly: 7,
        debug: 7,
        info: 6,
        notice: 5,
        warn: 4,
        error: 3
      };
      if (typeof winstonLevel === "number") return winstonLevel;
      return mappings[winstonLevel] || 6;
    };

    Gelfling.prototype.log = function(level, msg, meta, callback) {
      var message;
      if (this.silent) return callback(null, true);
      message = {
        version: "1.0",
        timestamp: +new Date() / 1000 >> 0,
        host: this.graylogHostname,
        facility: this.graylogFacility,
        short_message: msg,
        full_message: meta || {},
        level: this.getMessageLevel(level)
      };
      this.gelfling.send(message);
      return callback(null, true);
    };

    return Gelfling;

  })(winston.Transport);

}).call(this);
