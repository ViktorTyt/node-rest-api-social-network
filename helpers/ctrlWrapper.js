const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  // console.log("line 10 in ctrlWrapper".magenta.bold.italic);
  return func;
};

module.exports = ctrlWrapper;
