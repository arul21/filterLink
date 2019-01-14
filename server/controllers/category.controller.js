const Category = require('../models/Category')

module.exports = {
    addCategory: (req, res) => {
        Category.create({category: req.body.category})
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    listCategory: (req, res) => {
        Category.find({})
        .sort([['category', 'ascending']])
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(`errr`);
            res.status(500).json({message: err})
        })
    },

    updateOne: (req, res) => {
        Category.findOneAndUpdate({
            _id: req.params.id
        }, {
            category: req.body.category
        })
        .then(response => {
            res.status(200).json({
                response
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
    },

    deleteOne: (req, res) => {
        Category.findByIdAndRemove({
            _id: req.params.id
        })
        .then(response => {
            res.status(200).json({
                response
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
    },

    findOne: (req, res) =>{
        Category.findOne({
            _id: req.params.id
        })
        .then(response => {
            res.status(200).json({
                response
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
    }


}