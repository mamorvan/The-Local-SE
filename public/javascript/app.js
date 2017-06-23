
var request = require("request");
var cheerio = require("cheerio");

console.log("\n******************************************\n" +
            "scrape local.se headlines and links" +  
            "\n******************************************\n");

request("https://www.thelocal.se/", function(error, response, html) {

  // Load the HTML into cheerio
  var $ = cheerio.load(html);

  // Make an empty array for saving our scraped info
  var result = [];

  $(".panel").each(function(i, element) {
    var headline = $(element).find("h2").text();
    var link = $(element).find("a").attr("href");
    var imgLink = $(element).find("a").find("img").attr("src");
    //not all panels have a summary, summary will have empty string
    var summary = $(element).find("p").text();

    result.push({ 
        headline: headline,
        link: link,
        image: imgLink,
        summary: summary
     });
  });

  console.log(result);
});