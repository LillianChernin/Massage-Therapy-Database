const express = require('express');
const disorderRoutes = express.Router();


disorderRoutes.get('/', (req, res) => {
  res.render('./disorders/index', {
    documentTitle: "Musculoskeletal Disorders",
    data: [
      {name: "Frozen Shoulder",
      description: "series of symptoms involving pain and limited motion in glenohumeral join"},
      {name: "Carpal Tunnel Syndrome",
      description: "Entrapment neuropathy in the carpal tunnel"}
    ]
  })
})


module.exports = disorderRoutes;
