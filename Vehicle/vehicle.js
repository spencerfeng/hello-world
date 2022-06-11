const express = require('express');
const vehicle = express.Router();
const {callAWSapi} = require('../api');
const baseVehicleGetUrl = process.env.GET_VEHICLES_BASE_URL || 'https://bb61co4l22.execute-api.us-west-2.amazonaws.com/development/vehicles/'
vehicle.get('/vehicles/:id', (req, res) => {
    const id = req.params.id;
    const url = `${baseVehicleGetUrl}${id}`
    callAWSapi(url, res, 0);
  });

module.exports = vehicle;