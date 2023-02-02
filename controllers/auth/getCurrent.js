const getCurrent = async (req, res) => {
  const { _id, name, email, profilePicture } = req.user;
  res.json({
    code: 200,
    status: "success",
    message: "getCurrent success",
    data: {
      _id,
      name,
      email,
      profilePicture,
    },
  });
};

module.exports = getCurrent;
