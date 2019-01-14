const express = require('express');
const router = express.Router();
const user = require('./users')
const report = require('./report')
const category = require('./category')

router.use('/users', user)
router.use('/report', report)
router.use('/category', category)

module.exports = router;