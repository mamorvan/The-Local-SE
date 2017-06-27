var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema ({
    headline: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Notes"
    }]
});

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;