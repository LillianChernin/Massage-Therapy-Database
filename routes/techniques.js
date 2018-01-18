const express = require('express');
const techniqueRoutes = express.Router();

techniqueRoutes.get('/', (req, res) => {
  res.render('./techniques/index', {
    documentTitle: "Massage Techniques"
  })
})

module.exports = techniqueRoutes;
