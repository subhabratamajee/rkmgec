import { useRouter } from "next/router";
import Books from "../../models/Books";
import dbConnect from "../../lib/mongodb";

export default async (req, res) => {
    await dbConnect();
    const { method} = req;
    const {  userId,book_title,author,contact } = req.body;
    switch (method) {


        case "POST":
            try {
            //   const user = await User.findOne({ email  book_title  });
            //   if (user) {
            //     return res.status(422).json({ error: "please another email" });
            //   }
          
              const newBook = new Books({
                userId,
                book_title,
                author,
                contact,
              });
              const savedBook = await newBook.save();
              return res.status(200).json({message: 'Book is  added successfully in the list',
              success: true,});
            } catch (error) {
              return res.status(400).json({  message: new Error(error).message,
                success: false, });
            }
        }
      };

       