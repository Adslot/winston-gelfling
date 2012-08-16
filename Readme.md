# winston-gelfling

A [gelfling][2] transport for [winston][0]. Inspired by [winston-graylog2][1] transport.

## Installation
Tested on node-0.6.x, requires npm.

``` sh
  $ npm install winston-gelfling
```

## Usage
``` js
  var winston = require('winston');
  winston.add(require('winston-gelfling').Gelfling, options);

```

Options are the following:

* __level:__ Level of messages this transport should log. (default: info)
* __silent:__ Boolean flag indicating whether to suppress output. (default: false)

* __graylogHost:__ IP address or hostname of the graylog2 server. (default: localhost)
* __graylogPort:__ Port to send messages to on the graylog2 server. (default: 12201)
* __graylogHostname:__ The hostname associated with graylog2 messages. (default: require('os').hostname())
* __graylogFacility:__ The graylog2 facility to send log messages.. (default: nodejs)

[0]: https://github.com/flatiron/winston
[1]: https://github.com/flite/winston-graylog2
[2]: https://github.com/mhart/gelfling
