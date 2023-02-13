const Conversation = require("../../models/conversation");

const getConversationByTwoUser = async (req, res) => {
  console.log(req.params);
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = getConversationByTwoUser;
