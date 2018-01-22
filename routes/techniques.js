const express = require('express');
const techniqueRoutes = express.Router();
const db = require('../models');

techniqueRoutes.get('/', (req, res) => {
  res.render('./techniques/index', {
    documentTitle: "Massage Techniques"
  })
})
techniqueRoutes.get('/:id', (req, res) => {
  db.Technique.findById(req.params.id, (err, model) => {
    if (err) {
      res.status(500).send(err);
    }
    res.render('./techniques/individual-technique', {
      documentTitle: model.shortDescription,
      data: model
    })
  })
})


techniqueRoutes.post('/api/:id', (req, res) => {
  let newComment = new db.Comments(req.body);
  newComment.save();
  console.log(newComment);
  db.Technique.findByIdAndUpdate(req.params.id,
    {$push: {comments: newComment}},
    {safe: true, upsert: true, new: true}, (err, technique) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(technique);
  })
})

module.exports = techniqueRoutes;
