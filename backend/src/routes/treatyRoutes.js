const router = require('express').Router();
const { createTreaty, getTreaties } = require('../controllers/treatyController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.post('/', createTreaty);
router.get('/', getTreaties);
module.exports = router;


