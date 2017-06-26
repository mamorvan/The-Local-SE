//scrape button
$("#scrape").on("click", function(){
    $.ajax ({
        method: "GET",
        url: "/scrape"
    }).done(function(){
       location.href = "/scrape";
    });
});
