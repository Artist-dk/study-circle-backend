const db = require('../config/database');

exports.addNewBook = async (req, res) => {
  try {
    const {
      title, author, pages, language, bookType,
      publicationDate, publisher, genre,
      edition, price, description, coverImageURL
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Book file is required" });
    }

    const fileUrl = req.file.path;

    const sql = `
      INSERT INTO books
      (title, author, pages, language, bookType,
       publicationDate, publisher, genre, edition,
       price, description, coverImageURL, fileURL)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      title, author, pages, language, bookType,
      publicationDate, publisher, genre,
      edition, price, description, coverImageURL, fileUrl
    ];

    await db.query(sql, values);

    res.status(201).json({
      success: true,
      message: "Book added successfully",
    });

  } catch (error) {
    console.error("🔥 Server Error:", error);
    res.status(500).json({
      success: false,
      message: "Error adding book",
    });
  }
};

exports.fetchAllBooks = async (req, res) => {
  try {
    const sql = "SELECT * FROM books";

    // ✅ Promise-based query
    const [rows] = await db.query(sql);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "No books found",
      });
    }

    res.status(200).json({
      success: true,
      result: rows,
    });

  } catch (error) {
    console.error("🔥 Server Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching books",
    });
  }
};


exports.fetchNewBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const sql = "SELECT * FROM books WHERE id = ?";
    const [rows] = await db.query(sql, [bookId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      book: rows[0],
    });

  } catch (error) {
    console.error("🔥 Server Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching book",
    });
  }
};

// Update Book Details
// Remove a Book
// Search for Books
// Check Out Books
// Return Books
// Renew Books
// Reserve Books
// Manage Patron Accounts
// Generate Reports
// Fine Management
// Cataloging
// Interlibrary Loan
// Library Events Management
// Digital Library Management