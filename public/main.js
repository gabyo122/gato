(function(){
		
	function $(selector){
		return document.querySelector(selector);
	};

	function jugar(seleccionado){
		if (true) {
			seleccionado.innerHTML = "x";
		} else {
			seleccionado.innerHTML = "o";
		}
	}

	function definir_eventos(){
		var elements = document.querySelectorAll(".cat-element");

		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];

			element.addEventListener("click", function(){
				var posicion = this.id.split("-")[1];
				socket.play(posicion);
			});
		}
	}

	function build_cat(){
		for (var i = 0; i < 9; i++) {
			var item = build_item(i);
			$("#cat").innerHTML += item;		
		}

		definir_eventos();
	}

	function build_item(i){
		return "<div class='cat-element col-sm-4' id='elemento-"+i+"'></div>";
	}

	function convertir_a_figura(bandera){
		if(bandera){
			return "X"
		}

		return "O"
	}

	function reset(){
	
		var elements = document.querySelectorAll(".cat-element");
		for (var i = 0; i < elements.length; i++) {
			elements[i].innerHTML = ""
		}
	}
	
	build_cat();

	var socket = new Socket(function(figura){
		var figura_string = convertir_a_figura(figura);
		swal.fire({
		  title: figura_string + ' ganó la partida!',		  
		  icon: 'success',
		  confirmButtonText: 'Ok',
		  width: '25rem',
		  heightAuto: false
		})
	},function(posicion,figura){
		$("#message").innerHTML = "Es turno de las " + convertir_a_figura(!figura);
		$("#elemento-"+ posicion).innerHTML = convertir_a_figura(figura);
	},function(){
		swal.fire({
		  title: 'Alguien ingresó!',
		  text: 'Reiniciaremos el tablero',
		  icon: 'warning',
		  confirmButtonText: 'Ok',
		  width: '25rem',
		  heightAuto: false
		})
		reset();
	},function(){
		swal.fire({
		  title: 'No es tu turno!',
		  text: 'espera a que tire el otro jugador',
		  icon: 'error',
		  confirmButtonText: 'Ok',
		  width: '25rem',
		  heightAuto: false
		})
	},function(figura){
			$("#message").innerHTML = "juegas con la " + figura;
			if(figura == "X"){
				$("#message").innerHTML += " <br> Es tu turno"
			}else{
				$("#message").innerHTML += " <br> No es tu turno"
			}
	});

})();


