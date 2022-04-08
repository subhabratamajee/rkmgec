import { useRouter } from "next/router";
import User from "../../models/User";
import dbConnect from "../../lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY;
dbConnect();

export default async (req, res) => {
  const { method} = req;
  const { email, password } = req.body;
 
  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({ email });
        if (!user) {
          res.status(404).json({error: true, message: 'User not found'});
        } else {
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            res.status(401).json({ error: true, message: 'Auth Failed' });
          } else {
            const token = jwt.sign(
              {userIyyd: user._id,
                name:user.name ,email: user.email,
              admin:user.isAdmin},SECRET_KEY,
              // {
              //   expiresIn: 3600, //1HOUR
              // },
            );
            res.status(200).json({token,success:true,message:"successfull login"});
            return;
            // const payload = {
            //   id: _id,
            //   email,
              
            // };
            // jwt.sign(
            //   payload,
            //   jwtSecret,
            //   {
            //     expiresIn: 31556926, // 1 year in seconds
            //   },
            //   (err, token) => {
            //     /* Send succes with token */
            //     res.status(200).json({
            //       // success: true,
            //       token: ('Bearer ' + token),
            //     });
            //   },
            // );
            // res.status(200).json(user);
          
          }
        }
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
  }
};

// export function verifyToken(token,req,res) {
//   try {
//     var j = jwt.verify(token, SECRET_KEY);
//     return j;
//     console.log(j);
//   } catch (e) {
//     console.log('e:', e);
//     return null;
//   }
//   }
