// server.js
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect(
  "mongodb+srv://samriddhimaurya9005:<password>@cluster0.xpeq1tk.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Create a model for the PDFs
const pdfSchema = new mongoose.Schema({
  filename: String,
  path: String,
});

const PDF = mongoose.model('PDF', pdfSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handle file upload
app.post('/upload', upload.array('pdfs'), async (req, res) => {
  try {
    const files = req.files.map((file) => ({
      filename: file.originalname,
      path: file.path,
    }));

    // Save files to MongoDB
    await PDF.create(files);

    res.status(200).send('Files uploaded successfully!');
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
