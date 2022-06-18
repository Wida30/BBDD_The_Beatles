const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AlbumSchema = new Schema(
    {
        "id": Number,
        "author": String,
        "title": String,
        "year": Number,
        "cover": String,
        "song": String
    },
    {timestamps:true}
);

const Album = mongoose.model("albums", AlbumSchema);

module.exports = Album;