var express = require("express");
var router = express.Router();

router.route("/")
.get(function(req, res){
    res.render("index");
});
// .post(function(req, res){

// });

// router.route("/saved")
// .get(function(req, res){

// })
// .post(function(req, res){

// })
// .delete(function(req, res){

// });



module.exports = router;