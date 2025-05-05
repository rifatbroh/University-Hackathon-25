// routes/appliedJobRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/appliedJobController');

router.post('/', controller.addAppliedJob);
router.get('/', controller.getAllAppliedJobs);
router.put('/:id', controller.updateAppliedJob);
router.delete('/:id', controller.deleteAppliedJob);

module.exports = router;
