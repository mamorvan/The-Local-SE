var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var path = require("path");
var routes = require("./routes/routes.js");

var app = express();
var port = 8080;

app.use(express.static(path.join(__dirname + "/public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use('/', routes);

app.listen(port, function(){
    console.log("listening on port: " + port);
});