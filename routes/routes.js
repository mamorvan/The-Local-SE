var express = require("express");
var request = require("request");
var cheerio = require("cheerio");

var router = express.Router();

//render index page
router.route("/")
.get(function(req, res){
    res.render("index");
});

//render saved page
router.route("/saved")
.get(function(req, res){
    res.render("saved");
})

//show scraped articles
router.route("/scrape")
.get(function(req, res) {
    var articleNum = 0;
    request("https://www.thelocal.se/", function(error, response, html) {

        // Load the HTML into cheerio
        var $ = cheerio.load(html);

        // Make an empty array for saving our scraped info
        var result = [];

        $(".panel").each(function(i, element) {
            articleNum = (i);
            var headline = $(element).find("h2").text();
            var link = $(element).find("a").attr("href");
            var imgLink = $(element).find("a").find("img").attr("src");
            //not all panels have a summary, if none - summary will have empty string
            var summary = $(element).find("p").text();

            result.push({ 
                headline: headline,
                link: link,
                image: imgLink,
                summary: summary
            });
        });
        
        var articlesObject = {
            articles: result,
            articleNum: articleNum
        };
        res.render("index", articlesObject);
    });
});

// //see all saved articles
// router.route("/saved")
// .get(function(req, res){

// })
// //save an article
// .post(function(req, res){

// })
// //add or update a note to a saved article
// .update(function(req, res) {

// })
// //delete a saved article
// .delete(function(req, res){

// });



module.exports = router;