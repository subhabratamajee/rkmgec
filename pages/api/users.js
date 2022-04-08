import User from '../../models/User';









// get a user
 export default async  (req, res) => {
  const userId = req.body.userId;
  const email = req.body.email;
  const { method, body } = req;
  // const { email, password } = req.body;
  switch (method) {
    case "GET":
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ email });
    // const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({err:err.message});
  }
};}