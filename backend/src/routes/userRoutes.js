const router = require('express').Router();
const { createUser, getUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect, authorize('ADMIN'));
router.post('/', createUser);
router.get('/', getUsers);

module.exports = router;
