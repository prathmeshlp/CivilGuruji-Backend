const User = require("../models/User");



module.exports.updateActivity =  async (req, res) => {
  const { email, lastActivity, visitedCheckout } = req.body;
  console.log(email,lastActivity,visitedCheckout)
  // Update user activity in the database
  await User.findOneAndUpdate(
    { email: email },
    { lastActivity: lastActivity, visitedCheckout: visitedCheckout },
    { upsert: true }
  );
  res.status(200).send("User activity updated successfully");
};
