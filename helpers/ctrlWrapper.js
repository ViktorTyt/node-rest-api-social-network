const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    console.log("line 3");

    try {
      console.log("line 6");
      await ctrl(req, res, next);
    } catch (error) {
      console.log("line 9");
      next(error);
    }
  };

  console.log("line 14");
  return func;
};

module.exports = ctrlWrapper;
