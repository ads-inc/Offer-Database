const express = require('express');
const cors = require('cors');
const router = new express.Router();

router.options('/dashboard', cors())
router.get('/dashboard', cors(), (req, res) => {
  res.status(200).json({
    message: 'you are authorized to see this message'
  })
})

module.exports = router;
