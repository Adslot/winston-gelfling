winston = require 'winston'

exports.Gelfling = winston.transports.Gelfling = class Gelfling extends winston.Transport
  constructor: (options) ->
    @name = 'gelfling'
    @level = options.level || 'info'
    @silent = options.silent || false
    @handleExceptions = options.handleExceptions || false

    @graylogHost = options.graylogHost || 'localhost'
    @graylogPort = options.graylogPort || 12201
    @graylogHostname = options.graylogHostname || require('os').hostname()
    @graylogFacility = options.graylogFacility || 'nodejs'
    @graylogSequence = 0

    @gelfling = require('gelfling')(@graylogHost, @graylogPort, defaults: {facility: @graylogFacility})

  getMessageLevel: (winstonLevel) ->
    mappings =
      verbose: 7
      silly: 7
      debug: 7
      info: 6
      notice: 5
      warn: 4
      error: 3

    if (typeof winstonLevel is "number")
      return winstonLevel
    mappings[winstonLevel] || 6

  log: (level, msg, meta, callback) ->
    if (@silent)
      return callback null, true
    message =
      version: "1.0"
      timestamp: +new Date()/1000 >> 0
      host: @graylogHostname
      facility: @graylogFacility
      short_message: msg
      full_message: meta || {}
      level: @getMessageLevel(level)
    @gelfling.send message
    callback null, true