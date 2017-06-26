var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema ({
    headline: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    imageLink: {
        type: String
    },
    notes: {
        type: Schema.Types.ObjectId,
        ref: "notes"
    }
});

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;