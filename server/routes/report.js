const express = require('express')
const router = express.Router()
const {addReport, listReport, findOne, editReport, deleteReport, verifyReport, unverifyReport, getVerified, getOne, getUnverified} = require('../controllers/report-controller')

router.post('/', addReport)
router.get('/', listReport)
router.post('/url', findOne)
router.patch('/:id', editReport)
router.delete('/:id', deleteReport)
router.patch('/verify/:id', verifyReport)
router.patch('/unverify/:id', unverifyReport)
router.get('/verify', getVerified)
router.get('/unverify', getUnverified)
router.get('/:url', getOne)

module.exports = router;