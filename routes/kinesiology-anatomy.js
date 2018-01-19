const express = require('express');
const kaRoutes = express.Router();
const db = require('../models');

kaRoutes.get('/', (req, res) => {
  res.render('./kinesiology-anatomy/index', {
    documentTitle: "Kinesiology and Anatomy"
  })
})

kaRoutes.get('/bones', (req, res) => {
  res.render('./kinesiology-anatomy/bones', {
    documentTitle: "Bones"
  })
})

kaRoutes.get('/muscles', (req, res) => {
  res.render('./kinesiology-anatomy/muscles', {
    documentTitle: "Muscles"
  })
})

module.exports = kaRoutes;
