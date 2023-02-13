const { UserModel } = require("../../models/user");

const getFriends = async (req, res) => {
  // console.log(" line 4 in getFriends".yellow.bold.italic, req.params.userId);
  // const _id = req.params.userId;
  try {
    if (!req.params.userId) {
      throw new Error("userId don't passed");
    }

    const currentUser = await UserModel.findById(req.params.userId);

    const friends = await Promise.all(
      currentUser.followings.map((friendId) => {
        return UserModel.findById(friendId);
      })
    );

    // console.log(currentUser);

    let friendList = [];
    friends.map((friend) => {
      const { _id, name, profilePicture } = friend;
      friendList.push({ _id, name, profilePicture });
    });

    res.status(200).json({
      code: 200,
      status: "Success",
      data: friends,
      message: "request completed successfully",
    });
  } catch (error) {
    console.log("in error getFriends");
    res.status(500).json(error);
  }
};

module.exports = getFriends;
