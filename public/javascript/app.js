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
        // console.log(data);
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
        location.href = "/saved";
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
            //show existing notes for article
            for (var i = 0; i < data.notes.length; i++) {
            $("#notesgohere" + thisID).append("<div class='row'><p class='well col-sm-11'>" + data.notes[i].note + "</p><button class='btn btn-default trash-button' data=" + data.notes[i]._id + "><span class='glyphicon glyphicon-trash'></span></button></div>");
            }
        });
    });

    //save note
    $(document).on("click", "#save-note", function() {    
        var thisID = $(this).attr("data");
        // this doesn't work- returns blank- why?
        // var note = $("#note-text").val().trim();
        var note = $(this).closest("section").find("textarea").val().trim();
        //clear out add notes area
        $(this).closest("section").find("textarea").val("");
        //hide notes, show image
        $(this).closest("li").find("img").show();
        $(this).closest("li").find("section").hide();

        $.ajax({
            method: "POST",
            url: "/saved/" + thisID,
            data: {
                note: note
            }
        });
    });

    //delete a specific note
    $(document).on("click", ".trash-button", function(){
        var thisID = $(this).attr("data");
        console.log("app 79 trash button data:" + thisID);
        $.ajax({
            method: "DELETE",
            url: "/notes/" + thisID
        });
        $(this).closest("li").find("section").hide();
        $(this).closest("li").find("img").show();
    });

    //close notes
    $(document).on("click", "#close-notes", function() {
        $(this).closest("li").find("img").show();
        $(this).closest("li").find("section").hide();
    });
});