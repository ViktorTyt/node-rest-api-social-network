const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
      required: true,
    },
    likes: {
      type: Array,
      defaultl: [],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Comment", CommentSchema);
