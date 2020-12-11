function Socket(movimiento,gano,reiniciar){
	var juego = true;
	var socket = io();
	var self = this;

	self.play = function(posicion){
		socket.emit("nuevo movimiento",{posicion:posicion});
		movimiento(self.figura(),posicion);
	}

	self.figura = function(){
		if (self.juego) {
			return "X"
		}

		return "O"
	}

	socket.on("connect", function(){

		socket.on("init",function(data){
			console.log(data);
			juego = data.figure;
		});

	});

}