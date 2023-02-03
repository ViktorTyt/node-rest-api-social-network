const { UserModel } = "../../models/user.js";

const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await UserModel.findByIdAndRemove(req.params.id);
      res.status(204).json("Account has been removed");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can delete only your account");
  }
};

module.exports = deleteUser;
