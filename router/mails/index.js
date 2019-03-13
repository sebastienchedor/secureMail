const express = require('express');
const router = express.Router();

router.get('/', require("./get.js"));
router.post('/', require("./post.js"));

module.exports = router;
