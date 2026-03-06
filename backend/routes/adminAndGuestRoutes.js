import express from "express";
import User from "../Modals/user.js";
import Book from "../Modals/book.js";
import { authenticateToken } from "../middlewares/userAuth.js";
import { isAdmin } from "../middlewares/adminAuth.js";

const router = express.Router();

// Add book --- admin only
router.post("/add-book", authenticateToken, isAdmin, async (req, res) => {
  try {
    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });

    await book.save();

    return res.status(200).json({
      message: "Book added successfully",
      book,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

//update book -- admin
router.put("/update-book/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        desc: req.body.desc,
        language: req.body.language,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json({
      message: "Book updated successfully",
      updatedBook,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

//delete book --admin 
router.delete("/delete-book/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json({
      message: "Book deleted successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});


//Get All books (Public)
router.get("/get-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    return res.status(200).json(books);

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;