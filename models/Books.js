import mongoose from 'mongoose'


const BookSchema = new mongoose.Schema({
  name: {
  

    type: String,
    required: [true, 'Please Enter your name.'],
    maxlength: [30, 'Name cannot be more than 60 characters'],
  },
  roll: {
   

    type: String,
    required: [true, "Please provide the roll no"],
    maxlength: [20, "Roll No cannot be more than 60 characters"],
  },
  email: {
  
    type: String,
    required: [true, 'Please put email id'],
    maxlength: [30, 'email cannot be more than 40 characters'],
  },
  contact: {
      type: Number,
    maxlength:[10,'Contact number must be 10 Digit'],

  },
  year: {
   
    type: String,
  },
  book: {
   

    type: String,
  },
 
})

export default mongoose.models.Book || mongoose.model('Book', BookSchema)