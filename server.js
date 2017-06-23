var request = require("request");
var cheerio = require("cheerio");

// First, tell the console what server3.js is doing
console.log("\n******************************************\n" +
            "scrape local.se headlines and links" +  
            "\n******************************************\n");


// Run request to grab the HTML from awwards's clean website section
request("https://www.thelocal.se/", function(error, response, html) {

  // Load the HTML into cheerio
  var $ = cheerio.load(html);

  // Make an empty array for saving our scraped info
  var result = [];

  // With cheerio, look at each award-winning site, enclosed in "figure" tags with the class name "site"
  $(".section").each(function(i, element) {
    var headline = $(element).find("h2").text();
    var link = $(element).find("a").attr("href");
    /* Cheerio's find method will "find" the first matching child element in a parent.
     *    We start at the current element, then "find" its first child a-tag.
     *    Then, we "find" the lone child img-tag in that a-tag.
     *    Then, .attr grabs the imgs src value.
     * So: <figure>  ->  <a>  ->  <img src="link">  ->  "link"  */
    var imgLink = $(element).find("a").find("img").attr("src");

    // Push the image's URL (saved to the imgLink var) into the result array
    result.push({ 
        headline: headline,
        link: link,
        image: imgLink });
  });

  // With each link scraped, log the result to the console
  console.log(result);
});