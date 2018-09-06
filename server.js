var StaticServer = require('static-server');

var server = new StaticServer({
  rootPath: './dev/',
  port: 3000
});

server.start(function() {
  console.log('Server starterd on port ' + server.port);
});
