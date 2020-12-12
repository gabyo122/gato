var express = require("express");
var socket_io = require("socket.io");
var evaluator = require("./evaluator.js");

var app = express();
var io = socket_io();

var posiciones_ocupadas = {};
var turno = true;
var figure = true;

app.io = io;

io.on("connection", function(socket){	
	console.log("se conecto un nuevo cliente");

	posiciones_ocupadas = {};
	socket.broadcast.emit("reset",{});

	socket.emit("init", {figure: figure});
	socket.figure = figure;
	socket.user_board = []

	figure = !figure

	socket.on("nuevo movimiento", function(data){
		if(!posiciones_ocupadas[data.posicion]){

			if(turno == socket.figure){			

				// agregar valor al tablero
				socket.user_board.push(parseInt(data.posicion));
				
				// marcar posicion como ocupada y mandamos el movimiento
				posiciones_ocupadas[data.posicion] = true;
				io.emit("alguien_tiro",{posicion: data.posicion, figura: socket.figure});

				//evaluar si usuario gano
				var evaluacion_del_tablero = evaluator(socket.user_board);
				console.log("resultado" + evaluacion_del_tablero + "tablero" + socket.user_board)

				if(evaluacion_del_tablero){
					console.log("alguien gano")
					io.emit("ganaste", {figure: socket.figure})
				}

				turno = !turno;
			}else{
				socket.emit("no_te_toca",{});
			}

		}else{
			console.log("alguien ya tiro en esa posicion");
		}
		
	})

});

module.exports = app;