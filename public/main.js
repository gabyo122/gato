function $(selector){
	return document.querySelector(selector);
};

function build_cat(){
	for (var i = 0; i < 9; i++) {
		var item = build_item(i);
		$("#cat").innerHTML += item;		
	}
}

function build_item(i){
	return "<div class='cat-element col-sm-4' id='elemento-"+i+"'></div>";
}

build_cat();
