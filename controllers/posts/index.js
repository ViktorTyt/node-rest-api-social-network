const getPost = require("./getPost");
const createPost = require("./createPost");
const updatePost = require("./updatePost");
const updatePostImage = require("./updatePostImg");
const deletePost = require("./deletePost");
const getTimelinePosts = require("./getTimelinePosts");
const getAllPostsByUser = require("./getAllPostsByUser");
const likeOrDislikePost = require("./likeOrDislikePost");
const createPostComment = require("./createPostComment");

module.exports = {
  getPost,
  createPost,
  updatePost,
  updatePostImage,
  deletePost,
  getTimelinePosts,
  getAllPostsByUser,
  likeOrDislikePost,
  createPostComment,
};
