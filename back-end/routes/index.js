const express = require('express');

const router = express.Router();
const mock = require('../mock');
const model = require('../model');
const util = require('../util');

router.get('/getTable', (req, res) => {
  res.send(mock);
});

router.get('/getRiskFactors', (req, res) => {
  let riskFactors = [];
  for (let i = 0; i < mock.rows.length; i++) {
    riskFactors.push(model.formula(mock.rows[i].occupants, mock.rows[i].size));
  }
  res.send(riskFactors);
});

module.exports = router;
