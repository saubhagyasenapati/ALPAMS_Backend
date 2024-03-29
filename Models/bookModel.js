import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Book Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Book description"],
  },
  image: {
    type: String,
    required: [true, "Enter Image URL"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Book Category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please enter Book Stock"],
    maxLength: [4, "Stocks cannot be more than 4 characters"],
  },
  ISBN: {
    type: String,
    required: [true, "Please enter ISBN Number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Book = mongoose.model("Book", bookSchema);
