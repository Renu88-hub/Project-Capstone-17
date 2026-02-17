const router = require('express').Router();
const { getSummary } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');
router.get('/summary', protect, getSummary);
module.exports = router;
