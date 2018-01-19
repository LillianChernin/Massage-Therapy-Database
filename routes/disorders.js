const express = require('express');
const disorderRoutes = express.Router();
const db = require('../models');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
disorderRoutes.use(bodyParser.json());
disorderRoutes.use(bodyParser.urlencoded({ extended: true }));


disorderRoutes.get('/', (req, res) => {
  db.Disorder.find((err, disorders) => {
    res.render('./disorders/index', {
      documentTitle: "Musculoskeletal Disorders",
      data: disorders
    })
  })
})

disorderRoutes.get('/:id', (req, res) => {
  let currentId = req.params.id;
  db.Disorder.findById({currentId}, (err, disorder) => {
    res.render('./disorders/individual-disorder', {
      documentTitle: disorder.name,
      data: disorder
    })
  })
})

disorderRoutes.get('/:category', (req, res) => {
  db.Disorder.find({category: req.params.category}, (err, disorders) => {
    res.render('./disorders/disorders-by-category', {
      documentTitle: req.params.category,
      data: disorders
    })
  })
})

disorderRoutes.get('/:id/techniques', (req, res) => {
  let currentId = req.params.id;
  db.Disorder.findById({currentId}, (err, disorder) => {
    res.render('./disorders/techniques-by-disorder-id', {
      documentTitle: disorder.name + ' - Techniques',
      data: disorder
    })
  })
})

module.exports = disorderRoutes;
