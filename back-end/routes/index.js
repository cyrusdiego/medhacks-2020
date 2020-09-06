const express = require('express');

const router = express.Router();
const mock = require('../mock');

router.get('/getTable', (req, res) => {
  res.send(mock);
});

module.exports = router;
