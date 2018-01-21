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
  db.Disorder.findById(currentId, (err, disorder) => {
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
  db.Disorder.findById(currentId, (err, disorder) => {
    res.render('./disorders/techniques-by-disorder-id', {
      documentTitle: disorder.name + ' - Techniques',
      data: disorder
    })
  })
})

disorderRoutes.get('/:id/techniques/:technique_id', (req, res) => {
  let currentTechnique;
  db.Disorder.findById(req.params.id, (err, disorder) => {
    for (let i = 0; i < disorder.techniques.length; i++) {
      if (disorder.techniques[i]._id == req.params.technique_id) {
        currentTechnique = disorder.techniques[i];
      }
    }
    res.render('./techniques/individual-technique', {
      documentTitle: disorder.name + " - " + currentTechnique.shortDescription,
      data: currentTechnique,
      disorderId: req.params.id
    })
  })
})

disorderRoutes.post('/api/:id/techniques', (req, res) => {
  let newTechnique = new db.Technique(req.body);
  db.Disorder.findByIdAndUpdate(req.params.id,
  {$push: {techniques: req.body}},
  {safe: true, upsert: true, new: true}, (err, disorder) => {
    if (err) {
      res.status(500).send(err);
    }
    res.render('./disorders/techniques-by-disorder-id', {
      documentTitle: disorder.name + ' - Techniques',
      data: disorder
    })
  })
})

module.exports = disorderRoutes;
