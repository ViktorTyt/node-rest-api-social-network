const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    desc: {
      type: String,
      max: 500,
    },
    postImageURL: {
      type: String,
    },
    likes: {
      type: Array,
      defaultl: [],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Post", PostSchema);
