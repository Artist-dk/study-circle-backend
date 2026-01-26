const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/:filename", (req, res) => {
  const filename = req.params.filename;

//   console.log("Requested filename:", filename);

  const filePath = path.resolve(
    process.cwd(),
    "uploads",
    filename
  );

  console.log("Trying to download:", filePath);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: "File not found",
      filePath
    });
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${filename}"`
  );

  res.sendFile(filePath);
});

module.exports = router;
