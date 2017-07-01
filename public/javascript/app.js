//scrape button
$("#scrape").on("click", function(){
    location.href = "/scrape";
});

//save an article
$(document).on("click", "#save", function(){
      //fade out save button once clicked
    $(this).fadeOut("slow", function(){
        $.ajax({
            method: "POST",
            url: "/save",
            data: {
                headline: $(this).closest("li").find("h3").text(),
                link: $(this).closest("li").find("a").attr("href"),
                image: $(this).closest("li").find("img").attr("src"),
            }
        })
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

        $("#article-image" + thisID).hide();
        $("#notes-section" + thisID).show();
        // $(this).closest("li").find("img").hide();
        // $(this).closest("li").find("section").show();
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

    //save a note
    $(document).on("click", "#save-note", function() {    
        var thisID = $(this).attr("data");
        var note = $("#note-text" + thisID).val().trim();
        //empty note area
        $("#note-text" + thisID).val("");
        
        //hide notes, show image
        $("#article-image" + thisID).show();
        $("#notes-section" + thisID).hide();

        $.ajax({
            method: "POST",
            url: "/saved/" + thisID,
            data: {
                note: note
            }
        });
    });

    //delete a note
    $(document).on("click", ".trash-button", function(){
        var thisID = $(this).attr("data");
        //fade out delete button once clicked
        $(this).fadeOut("slow", function(){
            $.ajax({
                method: "DELETE",
                url: "/notes/" + thisID
            });
        });
    });

    //close notes
    $(document).on("click", "#close-notes", function() {
        //traverse DOM to find elements because no ID in data-attribute
        $(this).closest("li").find("img").show();
        $(this).closest("li").find("section").hide();
    });
});