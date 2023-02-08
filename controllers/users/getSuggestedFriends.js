const { UserModel } = require("../../models/user");

const getSuggestedFriends = async (req, res) => {
  req.user = user;

  console.log(user);
  // try {
  //   const users = await UserModel.findMany({});
  //   console.log(users);
  // } catch (error) {
  //   console.log(error);
  // }
};

module.exports = getSuggestedFriends;
