import mongoose from 'mongoose'


const BookSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'Please Enter your Userid.'],
    maxlength: [30, 'Name cannot be more than 60 characters'],
  },
  book_title: {
    type: String,
    required: [true, "Please provide the  Book Title"],
    maxlength: [20, "Book Title cannot be more than 60 characters"],
  },
  author: {
    type: String,
    required: [true, "Please provide the author name"],
    maxlength: [20, "Author cannot be more than 60 characters"],
  },
  contact: {
      type: Number,
    maxlength:[10,'Contact number must be 10 Digit'],

  },
isShow: {
  type: Boolean,
  default: false,
},
 
},
{timestamps:true})

export default mongoose.models.Book || mongoose.model('Book', BookSchema)