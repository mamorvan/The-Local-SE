var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var path = require("path");

var routes = require("./routes/routes.js");

//set up express
var app = express();
var port = 8080;

app.use(express.static(path.join(__dirname + "/public")));

app.use(bodyParser.urlencoded({ extended: false }));

//set up handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//set up mongoose
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/LocalScraperDB");
var db = mongoose.connection;

db.on("error", function(error){
    console.log("mongoose error: ", error);
});
db.once("open", function(){
    console.log("mongoose connection successful!");
});

//set up routes
app.use('/', routes);

app.listen(port, function(){
    console.log("listening on port: " + port);
});