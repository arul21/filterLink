const express = require('express')
const router = express.Router()
const {
    addCategory,
    listCategory,
    findOne,
    deleteOne,
    updateOne
} = require('../controllers/category.controller')

router.post('/', addCategory)
router.get('/', listCategory)
router.get('/:id', findOne)
router.delete('/:id', deleteOne)
router.put('/:id', updateOne)

module.exports = router