const express = require('express');
const router = express.Router();

// Sample GET endpoint
router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Wheat', growthStage: 'Sowing' },
    { id: 2, name: 'Rice', growthStage: 'Harvest' }
  ]);
});

module.exports = router;
