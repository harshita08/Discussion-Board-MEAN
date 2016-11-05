var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

mongoose.connect('mongodb://localhost/discussion_board_db2');
var models_path = path.join(__dirname, './../models');

//CONNECTION EVENTS
//When successfully connected

mongoose.connection.on( 'connected', function () {
  console.log("Mongoose connection established");
});

// If the connection throws an error

mongoose.connection.on( 'error', function ( err ) {
  console.error( `Mongoose default connection error: ${ err }` );
});

// When the connection is disconnected

mongoose.connection.on( 'disconnected', function () {
  console.log( 'Mongoose default connection disconnected' );
});

//If the Node process ends, close the Mongoose connection

process.on( 'SIGINT', function() {
  mongoose.connection.close( function () {
    console.log( 'Mongoose default connection disconnected through app termination' );
    process.exit( 0 );
  });
});

fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    
    require(models_path + '/' + file);
  }
});

