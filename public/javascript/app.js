//scrape button
$("#scrape").on("click", function(){
    location.href = "/scrape";
});

//saved button
$("#saved").on("click", function(){
    location.href = "/saved";
});

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

//unsave button
$(document).on("click", "#unsave", function(){
    var thisID = $(this).attr("data");
    $.ajax({
        type: "DELETE",
        url: "/saved/" + thisID
     }).done(function(){
        location.href = "/saved";
     });
});