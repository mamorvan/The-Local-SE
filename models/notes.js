var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteSchema = new Schema ({
    note: {
        type: String,
        trim: true
    }
});

var Notes = mongoose.model("Notes", noteSchema);

module.exports = Notes;