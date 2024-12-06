require('dotenv').config();
const { google } = require('googleapis');
const { Readable } = require('stream'); // Import the stream module
const multer = require('multer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const PdfDetailsSchema = require('../models/doc');

// Google Drive API setup
const KEYFILE_PATH = process.env.KEYFILE_PATH; // Replace with the path to your service account key file
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const GOOGLE_DRIVE_FOLDER_ID = process.env.FOLDER_ID; // Set this in your .env file

// Google Drive API setup
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILE_PATH,
  scopes: SCOPES,
});
const drive = google.drive({ version: 'v3', auth });

// Folder ID where PDFs will be stored on Google Drive

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory for processing
const upload = multer({ storage: storage });
const PdfSchema = mongoose.model('PdfDetails');

// Helper function to upload file to Google Drive
async function uploadToDrive(file, folderId) {
  const { originalname, buffer } = file;

  // Convert buffer to a readable stream
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  const fileMetadata = {
    name: originalname, // Original file name
    parents: [folderId], // Folder ID from environment variable
  };

  const media = {
    mimeType: 'application/pdf',
    body: stream, // Use the readable stream
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id, webContentLink, webViewLink',
  });

  return response.data;
}

// Route to upload PDF file
router.post('/upload-files/:userId', upload.single('file'), async (req, res) => {
  try {
    const { title, fundId } = req.body;
    const userId = req.params.userId;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload file to Google Drive
    const driveResponse = await uploadToDrive(req.file, GOOGLE_DRIVE_FOLDER_ID);

    // Save document details in the database
    const newPdf = await PdfSchema.create({
      title,
      pdf: driveResponse.webViewLink, // Google Drive link
      userId,
      fundId,
    });

    res.status(201).json({ status: 'ok', data: newPdf });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ status: 'error', message: 'Failed to upload file', error: error.message });
  }
});


// Route to fetch all files
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

// Route for downloading files
router.get('/download/:fileId', async (req, res) => {
  try {
    const fileId = req.params.fileId;

    // Get the file from Google Drive
    const driveResponse = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${fileId}.pdf"`);
    res.setHeader('Content-Type', 'application/pdf');

    // Pipe the file stream to the response
    driveResponse.data.pipe(res);
  } catch (err) {
    console.error('Error downloading file:', err);
    res.status(500).send({ error: 'Error downloading file' });
  }
});

// Route for deleting a document by fundId
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
