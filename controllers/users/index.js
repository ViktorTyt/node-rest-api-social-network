const getUser = require("./getUser");
const getFriends = require("./getFriends");
const followUser = require("./followUser");
const unfollowUser = require("./unfollowUser");
const deleteUser = require("./deleteUser");
const updateUser = require("./updateUser");
const updateUserCover = require("./updateUserCover");
const updateUserAvatar = require("./updateUserAvatar");

module.exports = {
  getUser,
  getFriends,
  followUser,
  unfollowUser,
  deleteUser,
  updateUser,
  updateUserCover,
  updateUserAvatar,
};
