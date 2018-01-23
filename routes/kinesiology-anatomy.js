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
  db.Muscle.find((err, muscles) => {
    if (err) {
      res.status(500).send(err);
    }
    res.render('./kinesiology-anatomy/muscles', {
      documentTitle: "Muscles",
      data: muscles
    })
  })
})

module.exports = kaRoutes;
