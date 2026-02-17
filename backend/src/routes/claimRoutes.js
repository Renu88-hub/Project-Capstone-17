const router = require('express').Router();
const { createClaim, updateStatus, getClaims, getClaim } = require('../controllers/claimController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);
router.post('/', authorize('CLAIMS_ADJUSTER'), createClaim);
router.get('/', authorize('CLAIMS_ADJUSTER'), getClaims);
router.get('/:id', authorize('CLAIMS_ADJUSTER'), getClaim);
router.put('/:id/status', protect, authorize('CLAIMS_ADJUSTER'), updateStatus);

module.exports = router;
