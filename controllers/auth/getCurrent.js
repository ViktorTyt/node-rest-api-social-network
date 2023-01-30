const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.json({
    code: 200,
    status: "success",
    message: "getCurrent success",
    data: {
      name,
      email,
    },
  });
};

module.exports = getCurrent;
