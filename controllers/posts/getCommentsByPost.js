const Comment = require("../../models/comment");
const Post = require("../../models/post");

const getCommentsByPost = async (req, res) => {
  console.log(req.params.id);
  try {
    const post = await Post.findById(req.params.id);
    console.log(req.params.id);

    const allComments = await Promise.all(
      post.comments.map((commentId) => {
        return Comment.findById(commentId);
      })
    );

    res.status(200).json({
      code: 200,
      status: "Success",
      data: {
        comments: allComments,
      },
    });
  } catch (error) {
    console.log("line 17");
    res.status(500).json(error);
  }
};

module.exports = getCommentsByPost;
