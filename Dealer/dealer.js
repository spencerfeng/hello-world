const express = require('express');
const {callAWSapi} = require('../api');
const dealer = express.Router();
const baseGetDealerUrl = process.env.GET_DEALERS_BASE_URL || 'https://bb61co4l22.execute-api.us-west-2.amazonaws.com/development/dealers'
dealer.get('/dealers', (req, res) => {
    callAWSapi(baseGetDealerUrl, res, 0);
  });
module.exports = dealer;