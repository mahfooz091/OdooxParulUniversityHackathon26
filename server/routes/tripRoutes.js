const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createTrip,
  getTrips,
  deleteTrip
} = require('../controllers/tripController');

router.post('/', auth, createTrip);
router.get('/', auth, getTrips);
router.delete('/:id', auth, deleteTrip);

module.exports = router;