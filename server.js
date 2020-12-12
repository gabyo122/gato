var express = require("express");
var http = require("http");
var app = require("./socket_express.js");


app.use("/static", express.static("public"))

app.get("/",function(req,res){
	res.sendFile("index.html",{"root":__dirname});
});


var server = http.createServer(app);

app.io.attach(server);

server.listen(8080);