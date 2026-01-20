const db = require("../config/database");

/**
 * ==============================
 * Add New Book
 * ==============================
 */
exports.addNewBook = async (req, res) => {
  try {
    console.log("Adding new book in database");

    const {
      title,
      author,
      pages,
      language,
      bookType,
      publicationDate,
      publisher,
      genre,
      edition,
      price,
      description,
      coverImageURL,
    } = req.body;

        //     formRef.current.elements["title"].value = 'The Great Gatsby';
        // formRef.current.elements["author"].value = 'F. Scott Fitzgerald';
        // formRef.current.elements["pages"].value = '180';
        // formRef.current.elements["language"].value = 'English';
        // formRef.current.elements["publicationDate"].value = '1925-04-10';
        // formRef.current.elements["publisher"].value = 'Charles Scribner\'s Sons';
        // formRef.current.elements["genre"].value = 'Fiction';
        // formRef.current.elements["edition"].value = 'First';
        // formRef.current.elements["price"].value = '10.99';
        // formRef.current.elements["description"].value = 'A novel by F. Scott Fitzgerald.';
        // formRef.current.elements["coverImageURL"].value = 'https://example.com/great-gatsby-cover.jpg';

    // 🔒 Basic validation
    if (!title) return res.status(400).json({ error: "Title is required" });
    if (!author) return res.status(400).json({ error: "Author is required" });
    if (!pages) return res.status(400).json({ error: "Pages are required" });
    if (!language) return res.status(400).json({ error: "Language is required" });

    // 📂 File handling
    if (!req.file) {
      return res.status(400).json({ error: "Book file is required" });
    }

    const fileUrl = req.file.path;

    const sql = `
      INSERT INTO books
      (title, author, pages, language, bookType, publicationDate, publisher, genre, edition, price, description, coverImageURL, fileURL)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      title,
      author,
      pages,
      language,
      bookType,
      publicationDate,
      publisher,
      genre,
      edition,
      price,
      description,
      coverImageURL,
      fileUrl,
    ];

    // ✅ Promise-based query
    const [result] = await db.query(sql, values);

    console.log("Book added successfully:", result.insertId);

    return res.status(201).json({
      message: "Book added to the library successfully",
      bookId: result.insertId,
    });

  } catch (error) {
    console.error("Error adding book:", error);
    return res.status(500).json({
      error: "Error adding book to the library",
    });
  }
};

/**
 * ==============================
 * Fetch All Books
 * ==============================
 */
exports.fetchAllBooks = async (req, res) => {
  try {
    const sql = `SELECT * FROM books`;

    const [rows] = await db.query(sql);

    if (rows.length === 0) {
      return res.status(404).json({ error: "No books found" });
    }

    console.log("Books fetched successfully");

    return res.status(200).json({
      count: rows.length,
      result: rows,
    });

  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({
      error: "Error fetching books from the library",
    });
  }
};

/**
 * ==============================
 * Fetch Single Book by ID
 * ==============================
 */
exports.fetchNewBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!bookId) {
      return res.status(400).json({ error: "Book ID is required" });
    }

    const sql = `SELECT * FROM books WHERE id = ?`;

    const [rows] = await db.query(sql, [bookId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    console.log("Book fetched successfully");

    return res.status(200).json({
      book: rows[0],
    });

  } catch (error) {
    console.error("Error fetching book:", error);
    return res.status(500).json({
      error: "Error fetching book from the library",
    });
  }
};
