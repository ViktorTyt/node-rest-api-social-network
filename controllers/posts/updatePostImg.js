const Post = require("../../models/post");

const addPostImage = async (postImageURL, post) => {
  console.log("in update line 4:", postImageURL);
  const postImage = await Post.findByIdAndUpdate(
    { _id: post._id },
    {
      postImageURL: postImageURL,
    },
    { new: true }
  );
  if (!postImage) {
    return null;
  }
  return postImage;
};

const updatePostImage = async (req, res, next) => {
  console.log("in update line 4:");

  const postImageURL = req.postImageURL;
  const post = req.result;
  const result = await addPostImage(postImageURL, post);
  if (!result) {
    res.status(500).json({
      code: 500,
      status: "Failed",
      message: "Upload post image failed, try again",
    });
  }
  res.status(201).json({
    code: 201,
    status: "Success",
    data: {
      post: result,
    },
  });
};

module.exports = updatePostImage;
