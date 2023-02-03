const Post = require("../../models/post");
const { UserModel } = require("../../models/user");

const getAllPostsByUser = async (req, res) => {
  console.log("profile");
  try {
    // console.log("first");
    const user = await UserModel.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });

    res.status(200).json(posts);
  } catch (error) {
    // console.log("here");
    res.status(500).json(error);
  }
};

module.exports = getAllPostsByUser;
