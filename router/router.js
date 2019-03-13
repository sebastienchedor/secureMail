const express = require('express');
const router = express.Router();

const mails = require('./mails');
router.use('/mails', mails);

const tokens = require('./tokens');
router.use('/tokens', tokens);

router.all('*', function(req, res){
  res.status(404).send('404, this page does not exist');
});

module.exports = router;
