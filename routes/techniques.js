const express = require('express');
const techniqueRoutes = express.Router();

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

module.exports = techniqueRoutes;
