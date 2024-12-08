const express = require('express');
const router = express.Router();
const multer = require("multer");
const mongoose = require('mongoose');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinary'); // Cloudinary configuration file
const PdfDetailsSchema = require('../models/doc');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "pdf-files", // Cloudinary folder name
    format: async (req, file) => "pdf", // Always save as PDF
    public_id: (req, file) => `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, "")}`, // Unique name
  },
});

const upload = multer({ storage: storage });
const PdfSchema = mongoose.model("PdfDetails");

// Route to upload PDF file
router.post("/upload-files/:userId", upload.single("file"), async (req, res) => {
  try {
    const { title, fundId } = req.body;
    const fileUrl = req.file.path;
    const userId = req.params.userId;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Save document details in database
    const newPdf = await PdfSchema.create({
      title: title,
      pdf: fileUrl,
      userId: userId,
      fundId: fundId,
    });

    res.send({ status: "ok", data: newPdf });

  } catch (error) {
    console.error("Error saving PDF details:", error);
    res.status(500).json({ status: "error", message: "Failed to upload file", error: error.message });
  }
});

// Route to download a PDF file from Cloudinary
router.get('/download/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;

    // Validate and construct the file URL
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/YOUR_CLOUDINARY_CLOUD_NAME'; // Replace with your base URL
    const fileUrl = fileId.startsWith('http') ? fileId : `${cloudinaryBaseUrl}/${fileId}`;

    // Stream the file to the client
    const fileName = path.basename(fileUrl); // Extract the file name
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/pdf');

    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error(`Failed to fetch file: ${response.statusText}`);

    response.body.pipe(res); // Stream response to client
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ message: 'Failed to download file', error: error.message });
  }
});
// Existing routes for Google Drive remain unchanged

// Route to fetch all files from the database
router.get('/get-files', async (req, res) => {
  try {
    const data = await PdfSchema.find({});
    res.status(200).json({ status: 'ok', data });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Error fetching files' });
  }
});

// Route to fetch files by fundId
router.get('/get-user-files/:fundId', async (req, res) => {
  const { fundId } = req.params;
  try {
    const userDocuments = await PdfSchema.find({ fundId });
    res.status(200).json({ data: userDocuments });
  } catch (error) {
    console.error('Error fetching user documents:', error);
    res.status(500).json({ error: 'Error fetching user documents' });
  }
});

// Route for deleting a document by fundId (unchanged)
router.delete('/deleteDoc/:fundId', async (req, res) => {
  const { fundId } = req.params;
  try {
    const result = await PdfSchema.findOneAndDelete({ fundId });

    if (!result) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    // Delete file from Google Drive
    const fileId = result.pdf.split('id=')[1];
    await drive.files.delete({ fileId });

    res.status(200).json({ message: 'PDF deleted successfully' });
  } catch (error) {
    console.error('Error deleting PDF:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
