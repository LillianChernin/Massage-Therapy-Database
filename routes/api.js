const express = require('express');
const apiRoutes = express.Router();
const db = require('../models');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
apiRoutes.use(bodyParser.json());
apiRoutes.use(bodyParser.urlencoded({ extended: true }));


apiRoutes.post('/disorders/:disorder_id/techniques', (req, res) => {
  let newTechnique = new db.Technique(req.body);
  newTechnique.save();
  console.log(newTechnique);
  db.Disorder.findByIdAndUpdate(req.params.disorder_id,
  {$push: {techniques: newTechnique}},
  {safe: true, upsert: true, new: true}, (err, disorder) => {
    if (err) {
      res.status(500).send(err);
    }
    console.log(disorder);
    res.render('./disorders/techniques-by-disorder-id', {
      documentTitle: disorder.name + ' - Techniques',
      data: disorder
    })
  })
})

apiRoutes.post('/:technique_id', (req, res) => {
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

module.exports = apiRoutes;
