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
            res.render("saved", savedArticles);
        }
    });
});

router.route("/saved/:id")
//get saved notes for specific article
.get(function(req, res){
    Article.findOne({"_id": req.params.id})
    .populate("notes")
    .exec(function(error, doc){
        if (error) {
            console.log(error);
        } else {
            res.json(doc);
        }
    })
})
//add a note to a saved article
.post(function(req, res) {
    var newNote = new Notes(req.body);
    newNote.save(function(error, doc){
        if (error) {
            console.log(error);
        } else {
            Article.findOneAndUpdate({"_id": req.params.id}, { $push: {"notes": doc._id} }, {new: true})
            .exec(function(error, doc) {
                if (error) {
                    console.log(error);
                } else {
                    res.send(doc);
                }
            });
        }
    });
})
//delete a saved article
.delete(function(req, res){
    Article.findByIdAndRemove(req.params.id, function(error, doc){
        if (error) {
            console.log(error);
        }
    }); 
});

router.route("/notes/:id")
//delete a note
.delete(function(req, res){
    Notes.remove({_id: req.params.id}, function(error, doc){
        if (error) {
            console.log(error);
        } 
    });
});
module.exports = router;