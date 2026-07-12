const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({

    title: String,

    category: String,

    author: String,

    date: String,

    content: String,

    image: String

});

module.exports = mongoose.model("Blog", blogSchema);