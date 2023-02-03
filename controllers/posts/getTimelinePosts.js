const Post = require("../../models/post");

const getTimelinePosts = async (req, res) => {
  console.log("timeline");
  try {
    if (!req.params.userId) {
      throw new Error("userId don't passed");
    }
    const currentUser = await UserModel.findById(req.params.userId);
    // console.log(currentUser);

    const userPosts = await Post.find({ userId: currentUser._id });
    const friendsPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    res.status(200).json(userPosts.concat(...friendsPosts));
  } catch (error) {
    // console.log("here");
    res.status(500).json(error);
  }
};

module.exports = getTimelinePosts;
