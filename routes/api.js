const express = require('express');
const apiRoutes = express.Router();
const db = require('../models');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
apiRoutes.use(bodyParser.json());
apiRoutes.use(bodyParser.urlencoded({ extended: true }));

apiRoutes.get('/disorders', (req, res) => {
  db.Disorder.find((err, disorders) => {
    res.json(disorders);
  })
})

apiRoutes.get('/disorders/:id', (req, res) => {
  db.Disorder.findById(req.params.id, (err, disorder) => {
    res.json(disorder);
  })
})

apiRoutes.get('/disorders/:id/techniques', (req, res) => {
  db.Disorder.findById(req.params.id, (err, disorder) => {
    res.json(disorder.techniques);
  })
})

apiRoutes.get('/disorders/:id/techniques/:technique_id', (req, res) => {
  db.Technique.findById(req.params.technique_id, (err, technique) => {
    res.json(technique);
  })
})

apiRoutes.get('/disorders/:id/techniques/:technique_id/comments', (req, res) => {
  db.Technique.findById(req.params.technique_id, (err, technique) => {
    res.json(technique.comments);
  })
})

apiRoutes.get('/muscles', (req, res) => {
  db.Muscle.find((err, muscles) => {
    res.json(muscles);
  })
})

apiRoutes.get('/muscles/:id', (req, res) => {
  db.Muscle.findById(req.params.id, (err, muscle) => {
    res.json(muscle);
  })
})

apiRoutes.get('/techniques', (req, res) => {
  db.Technique.find((err, techniques) => {
    res.json(techniques);
  })
})

apiRoutes.get('/techniques/:id', (req, res) => {
  db.Technique.findById(req.params.id, (err, technique) => {
    res.json(technique);
  })
})

apiRoutes.get('/techniques/:id/comments', (req, res) => {
  db.Technique.findById(req.params.id, (err, technique) => {
    res.json(technique.comments);
  })
})


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

apiRoutes.post('/techniques/:technique_id', (req, res) => {
  let newComment = new db.Comments(req.body);
  newComment.save();
  db.Technique.findByIdAndUpdate(req.params.technique_id,
    {$push: {comments: newComment}},
    {safe: true, upsert: true, new: true}, (err, technique) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(technique);
  })
})

apiRoutes.delete('/disorders/:disorder_id/techniques/:technique_id', (req, res) => {
  db.Technique.remove( {_id: req.params.technique_id}, (err, technique) => {
    if (err) {
      console.log('error removing technique from technique db');
    }
  })
  db.Disorder.findOneAndUpdate({ _id: req.params.disorder_id },
    { $pull: { techniques: { _id: req.params.technique_id}}},
    (err, model) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(model);
    })
})

module.exports = apiRoutes;
