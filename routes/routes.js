var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/articles.js");
var Notes = require("../models/notes.js");
var router = express.Router();

//render index page
router.route("/")
.get(function(req, res){
    res.render("index");
});

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
            //get data from scraped articles to display using handlebars
            var headline = $(element).find("h2").text();
            var link = $(element).find("a").attr("href");
            var imgLink = $(element).find("a").find("img").attr("src");
            //not all panels have a summary, if none - summary will have empty string
            var summary = $(element).find("p").text();

            result.push({ 
                headline: headline,
                link: link,
                image: imgLink,
                summary: summary,
                articleId: articleNum
            });
        });
        
        var articlesObject = {
            articles: result,
            articleNum: articleNum
        };
        res.render("index", articlesObject);
    });
});

//save an article
router.route("/save")
.post(function(req, res){
    var newArticle = new Article(req.body);
    newArticle.save(function(error, doc){
        if (error) {
            console.log(error);
        } else {
            console.log(doc);
            res.send("Article has been saved");
        }
    })

});

//see all saved articles
router.route("/saved")
.get(function(req, res){
    Article.find({}, function(error, doc){
        if (error) { 
            console.log(error);
        } else {
            var savedArticles = {
                savedArticles: doc
            };
            console.log("routes.js 77: " + JSON.stringify(savedArticles));
            res.render("saved", savedArticles);
        }
    });
});

router.route("/saved/:id")
//add or update a note to a saved article
// .update(function(req, res) {

// })
//delete a saved article
.delete(function(req, res){
    Article.findByIdAndRemove(req.params.id, function(error, doc){
        if (error) {
            console.log(error);
        } else {
            console.log("route.js 90 - article deleted");
        }
    })
   
});



module.exports = router;