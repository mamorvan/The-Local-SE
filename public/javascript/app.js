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
        }).done(function(data) {
            $("#notesgohere" + thisID).empty();
            
            console.log("app 46 - data from get notes for article" + JSON.stringify(data) + "data.notes.length" + data.notes.length);
            for (var i = 0; i < data.notes.length; i++) {
            $("#notesgohere" + thisID).append("<p class=well>" + data.notes[i].note + "</p>");
            }
        });
    });

    //save note
    $(document).on("click", "#save-note", function() {
       
        var thisID = $(this).attr("data");
        // this doesn't work- returns blank- why?
        // var note = $("#note-text").val().trim();
        var note = $(this).closest("section").find("textarea").val().trim();
        $(this).closest("section").find("textarea").val("");
        $(this).closest("li").find("img").show();
        $(this).closest("li").find("section").hide();

        $.ajax({
            method: "POST",
            url: "saved/" + thisID,
            data: {
                note: note
            }
        });
    });

    //close notes
    $(document).on("click", "#close-notes", function() {
        $(this).closest("li").find("img").show();
        $(this).closest("li").find("section").hide();
    });
});