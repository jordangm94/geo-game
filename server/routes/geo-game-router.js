const express = require('express');
const router = express.Router();

/////////////////////////////////
/// Index
/////////////////////////////////

router.get('/', (req, res) => {
  res.send('HELLO and welcome to the Geo Game!');
})

module.exports = router;