const Comment = require("../../models/comment");

const getCommentById = async (req, res) => {
  try {
    const post = await Comment.findById(req.params.id);
    console.log("in byID line 6");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = getCommentById;
