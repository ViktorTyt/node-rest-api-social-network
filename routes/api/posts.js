const { createPost, updatePostImage } = require("../../controllers/posts");
const { ctrlWrapper, upload } = require("../../helpers");
const { authenticate, fileLoader } = require("../../middlewares");
const Post = require("../../models/post");
const { UserModel } = require("../../models/user");
const router = require("express").Router();

// create a post
router.post(
  "/",
  authenticate,
  upload.single("postImg"),
  ctrlWrapper(createPost),
  ctrlWrapper(fileLoader),
  ctrlWrapper(updatePostImage)
);
// update a post
router.put("/:id", async (req, res) => {
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
});
// delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(204).json("The post has been deleted");
    } else {
      res.status(403).json("You can delete only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// like or dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  console.log("timeline");
  try {
    if (!req.params.userId) {
      throw new Error("userId don't passed");
    }
    console.log(req.params.userId);
    const currentUser = await User.findById(req.params.userId);

    const userPosts = await Post.find({ userId: currentUser._id });
    const friendsPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    res.status(200).json(userPosts.concat(...friendsPosts));
  } catch (error) {
    console.log("here");
    res.status(500).json(error);
  }
});

// get user`s all posts
router.get("/profile/:username", async (req, res) => {
  console.log("profile");
  try {
    console.log("first");
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });

    res.status(200).json(posts);
  } catch (error) {
    console.log("here");
    res.status(500).json(error);
  }
});

module.exports = router;