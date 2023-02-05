const Post = require("../../models/post");
const { UserModel } = require("../../models/user");

const getAllPostsByUser = async (req, res) => {
  console.log("profile");
  try {
    // console.log("first");
    const user = await UserModel.findOne({ name: req.params.username });
    const posts = await Post.find({ userId: user._id });

    res.status(200).json(
      posts.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      })
    );
  } catch (error) {
    // console.log("here");
    res.status(500).json(error);
  }
};

module.exports = getAllPostsByUser;
