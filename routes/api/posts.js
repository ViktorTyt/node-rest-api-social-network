const router = require("express").Router();

const ctrl = require("../../controllers/posts");

const { ctrlWrapper, upload } = require("../../helpers");

const { authenticate, fileLoader } = require("../../middlewares");

// create a post
router.post(
  "/",
  authenticate,
  upload.single("postImg"),
  ctrlWrapper(ctrl.createPost),
  ctrlWrapper(fileLoader),
  ctrlWrapper(ctrl.updatePostImage)
);

// update a post
router.put("/:id", authenticate, ctrlWrapper(ctrl.updatePost));

// delete a post
router.delete("/:id", authenticate, ctrlWrapper(ctrl.deletePost));

// like or dislike a post
router.patch("/:id/like", authenticate, ctrlWrapper(ctrl.likeOrDislikePost));

// get a post
router.get("/:id", authenticate, ctrlWrapper(ctrl.getPost));

// get timeline posts
router.get(
  "/timeline/:userId",
  authenticate,
  ctrlWrapper(ctrl.getTimelinePosts)
);

// get user`s all posts
router.get(
  "/profile/:username",
  authenticate,
  ctrlWrapper(ctrl.getAllPostsByUser)
);

module.exports = router;
