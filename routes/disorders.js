const express = require('express');
const disorderRoutes = express.Router();


disorderRoutes.get('/', (req, res) => {
  res.render('./disorders/index', {
    documentTitle: "Musculoskeletal Disorders"
  })
})

module.exports = disorderRoutes;
