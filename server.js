var express = require("express");
var http = require("http");
var app = express();

app.use("/static", express.static("public"))

app.get("/",function(req,res){
	res.sendFile("index.html",{"root":__dirname});
});


var server = http.createServer(app);

server.listen(8080);