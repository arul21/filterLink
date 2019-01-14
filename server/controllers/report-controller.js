const Report = require('../models/Report')


module.exports = {
    addReport: (req, res) => {
        Report.create({
            title: req.body.title,
            url: req.body.url,
            category: req.body.category,
            reporter: req.body.reporter,
            email: req.body.email,
            nohp: req.body.nohp,
            address: req.body.address
        })
        .then(response => {
            res.status(201).json({
                report: response
            })
        })
        .catch(err => {
            console.log(`adadsasda`,err)
            res.status(500).json({
                message: err
            })
        })
    },

    listReport: (req, res) => {
        Report.find({})
            .sort([['createdAt', 'descending']])
            .populate('category')
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json({
                    message: err
                })
            })
    },

    findOne: (req, res) =>{
        console.log(`1ini ommm`);
        let url = req.body.url
        let reporter = req.body.reporter
        let email = req.body.email
        let nohp = req.body.nohp
        Report.find({ url: url})
        .populate('category')
        .then(response => {
            if(response.length === 1){
                res.status(200).json(response)
            } else {
                res.status(400).json({msg:`URL Not Registered`})
                // Report.create({
                //     url, reporter, email, nohp
                // })
                // .then(newReport =>{
                //     res.status(201).json({
                //         err: false,
                //         message: `Success add report`,
                //         data: newReport
                //     })
                // })
                // .catch(err =>{
                //     console.log(`masih di verifikasi`);
                //     res.status(500).json(err)
                // })
            }
        })
        .catch(err => {
            console.log(err);
            
            res.status(500).json({
                message: err
            })
        })
    },

    editReport: (req, res)=>{
        Report.updateOne({
            _id: req.params.id
        },{
            category: req.body.category
        })
        .then(response =>{
            res.status(201).json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        })
    },

    deleteReport: (req, res) =>{
        Report.deleteOne({
            _id: req.params.id
        })
        .then(response =>{
            res.status(201).json(response)
            console.log(`berhasil delete`);
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        })
    },

    verifyReport: (req, res) =>{
        Report.updateOne({
            _id: req.params.id
        },{
            status: 'verified'
        })
        .then(response =>{
            res.status(201).json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        })
    },

    unverifyReport: (req, res) =>{
        Report.updateOne({
            _id: req.params.id
        },{
            status: 'unverified'
        })
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        })
    },

    getVerified: (req, res) =>{
        Report.find({
            status: 'verified'
        })
        .populate('category')
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        })
    },

    getUnverified: (req, res) =>{
        Report.find({
            status: 'unverified'
        })
        .populate('category')
        .then(response =>{
            console.log(response);
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        })
    },

    getOne: (req, res) =>{
        Report.findOne({
            url: req.params.url
        })
        .populate('category')
        .then(response =>{
            console.log(`ini`,response);
            if(response){
                res.status(200).json(response)
            } else {
                res.status(400).json(response)
                console.log(`ini notfound`);
                
            }
            
            
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },
}