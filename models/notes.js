var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteSchema = new Schema ({
    notes: {
        type: string,
        trim: true
    }
});

var Notes = mongoose.model("Notes", noteSchema);

module.exports = Notes;