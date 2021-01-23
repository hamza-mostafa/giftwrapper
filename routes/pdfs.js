const express = require('express');
const {fetchPdfs, handlePattern} = require("../controllers/Pdf");
const router = express.Router();

/* GET users listing. */
router.post('/pattern', handlePattern);

/* GET uploaded pdfs listing. */
router.get('/', fetchPdfs);

module.exports = router;
