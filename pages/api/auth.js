import { useRouter } from "next/router";
import User from "../../models/User";
import dbConnect from "../../lib/mongodb";
import bcrypt from "bcrypt";




export default async (req, res) => {
  await dbConnect();
  const { method, body } = req;
  const { name, email, password } = req.body;
  switch (method) {
    // case "GET":
    //   try {
    //     const user = await User.find();
    //     return res.status(200).json(user);
    //   } catch (err) {
    //     return res.status(400).json({ msg: err.message });
    //   }
    case "POST":
      try {
        const user = await User.findOne({ email });
        if (user) {
          return res.status(422).json({ error: "please another email" });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
        });
        const savedUser = await newUser.save();
        return res.status(200).json({msg:"success"});
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
};
