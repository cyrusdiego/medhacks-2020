const express = require('express');

const router = express.Router();

router.get('/test', (req, res) => {
  res.send('Received a GET HTTP method');
});

module.exports = router;
