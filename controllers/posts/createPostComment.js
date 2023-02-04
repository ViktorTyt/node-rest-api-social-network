const Comment = require("../../models/comment");
const Post = require("../../models/post");
const { UserModel } = require("../../models/user");

const createPostComment = async (req, res) => {
  const { userId, postId, desc } = req.body;

  const comment = await Comment.create({
    userId,
    postId,
    desc,
  });

  await Post.findByIdAndUpdate(
    { _id: postId },
    { $push: { comments: comment._id } },
    { new: true }
  );

  await UserModel.findByIdAndUpdate(
    { _id: userId },
    { $push: { comments: comment._id } },
    { new: true }
  );

  res.status(201).json({
    code: 201,
    status: "Success",
    data: {
      comment,
    },
  });
};

module.exports = createPostComment;
