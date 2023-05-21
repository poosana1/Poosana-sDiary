const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: {},
    required: true,
  },
  author: {
    type: String,
    default: "Admin",
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Blogs", blogSchema);