const { UserModel } = "../../models/user.js";

const getFriends = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return UserModel.findById(friendId);
      })
    );

    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });

    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = getFriends;
