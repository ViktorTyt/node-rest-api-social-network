const Post = require("../../models/post");
const { UserModel } = require("../../models/user");

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

    res.status(200).json(
      userPosts.concat(...friendsPosts).sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      })
    );
  } catch (error) {
    // console.log("here");
    res.status(500).json(error);
  }
};

module.exports = getTimelinePosts;
