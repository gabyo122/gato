var express = require("express");
var socket_io = require("socket.io");

var app = express();
var io = socket_io();

var figure = true;

app.io = io;

io.on("connection", function(socket){
	console.log("se conecto un nuevo cliente");

	socket.emit("init", {figure: figure});

	figure = !figure

	socket.on("nuevo movimiento", function(data){
		console.log(data);
	})

});

module.exports = app;