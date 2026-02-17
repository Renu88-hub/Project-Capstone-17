const router = require('express').Router();
const {
  createPolicy,
  approvePolicy,
  rejectPolicy,
  getPolicies,
  getPolicyById,
  getPolicyAuditLogs,
  getActivePolicies
} = require('../controllers/policyController');

const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);

router.get('/', getPolicies);
router.get('/:id', getPolicyById);

router.post('/', authorize('UNDERWRITER'), createPolicy);
router.put('/:id/approve', authorize('UNDERWRITER'), approvePolicy);
router.put('/:id/reject', authorize('UNDERWRITER'), rejectPolicy);
router.get('/:id/audits', getPolicyAuditLogs);
router.get('/active', getActivePolicies);

module.exports = router;

