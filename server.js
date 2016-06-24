/* Librerias necesarias para la aplicación */
var express = require('express');
var app = express();
var path = require('path');   
var http = require('http').Server(app);
var io   = require('socket.io')(http);



app.use(express.static(path.join(__dirname, 'views'))); 


http.listen(8080, function() {
  console.log('listening on :8080');
});