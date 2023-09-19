
const { Int32, Double } = require("bson");
const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        title: "String",
        numero: Number,
        content: "String",
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", schema);
module.exports = Post;