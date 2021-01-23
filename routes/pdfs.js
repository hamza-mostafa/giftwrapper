const express = require('express');
const { fetchPdfs, handlePattern } = require("../controllers/Pdf");
const router = express.Router();

/* Post the pattern file listing. */
router.post('/pattern', handlePattern);

/* GET uploaded pdfs listing. */
router.get('/', fetchPdfs);

module.exports = router;
