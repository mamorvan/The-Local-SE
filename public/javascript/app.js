//scrape button
$("#scrape").on("click", function(){
    location.href = "/scrape";
});

//save an article
$(document).on("click", "#save", function(){
    $.ajax({
        type: "POST",
        url: "/save",
        data: {
            headline: $(this).closest("li").find("h3").text(),
            link: $(this).closest("li").find("a").attr("href"),
            image: $(this).closest("li").find("img").attr("src"),
        }
    }).done(function(data){
        console.log(data);
    });
});

//go to saved articles
$("#saved").on("click", function(){
    location.href = "/saved";
});

//unsave an article button
$(document).on("click", "#unsave", function(){
    var thisID = $(this).attr("data");
    $.ajax({
        type: "DELETE",
        url: "/saved/" + thisID
     }).done(function(){
        location.href = "/saved";
     });
});

//see notes
$(document).on("click", "#note", function() {
    var thisID = $(this).attr("data");
    $(this).closest("li").find("img").hide();
    $(this).closest("li").find("section").show();
    $.ajax({
        type: "GET",
        url: "/saved/" + thisID
    })
});

//close notes
$(document).on("click", "#close-notes", function() {
    $(this).closest("li").find("img").show();
    $(this).closest("li").find("section").hide();
});