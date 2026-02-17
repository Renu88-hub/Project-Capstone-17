const router = require('express').Router();
const { createReinsurer, getReinsurers } = require('../controllers/reinsurerController');
const { protect } = require('../middleware/authMiddleware');
router.use(protect);
router.post('/', createReinsurer);
router.get('/', getReinsurers);
module.exports = router;
