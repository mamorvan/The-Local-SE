//scrape button
$("#scrape").on("click", function(){
    location.href = "/scrape";
});

//save an article
$(document).on("click", "#save", function(){
    $.ajax({
        method: "POST",
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
            method: "DELETE",
            url: "/saved/" + thisID
        });
    });

    $(document).ready(function() {
        
    //see notes
    $(document).on("click", "#note", function() {
        var thisID = $(this).attr("data");
        $(this).closest("li").find("img").hide();
        $(this).closest("li").find("section").show();
        $.ajax({
            method: "GET",
            url: "/saved/" + thisID
        });
    });

    //save note
    $(document).on("click", "#save-note", function() {
        var thisID = $(this).attr("data");
        $(this).closest("li").find("img").show();
        $(this).closest("li").find("section").hide();

        $.ajax({
            method: "POST",
            url: "saved/" + thisID,
            data: {
                note: $("#notetext").val()
            }
        });
    });

    //close notes
    $(document).on("click", "#close-notes", function() {
        $(this).closest("li").find("img").show();
        $(this).closest("li").find("section").hide();
    });
});