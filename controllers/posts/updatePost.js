const Post = require("../../models/post");

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The post has been updated");
    } else {
      res.status(403).json("You can update only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = updatePost;
