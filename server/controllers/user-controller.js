const User = require('../models/User')
const hash = require('../helpers/hash')

module.exports = {
    signin: (req, res) => {
        console.log(`masukkk brooo`);
        
        let userName = req.body.userName
        let password = req.body.password
        User.findOne({
                userName: userName
            })
            .then(user => {
                if (hash.decode(password, user.password)) {
                    res.status(200).json({
                        err: false,
                        msg: `Succesfully Login`,
                        token: hash.jwtEncode({
                            id: user._id,
                            userName: user.userName
                        })
                    })
                } else {
                    res.status(400).json({
                        message: "Password is wrong"
                    })
                }
            })
            .catch(err => {
                console.log(`ini`, err);

                res.status(500).json({
                    err: err
                })
            })
    },

    signup: (req, res) => {
        let userName = req.body.userName
        let password = req.body.password
        User.find({
                userName: userName
            })
            .then(user => {
                if (user.length === 0) {
                    User.create({
                            userName,
                            password
                        })
                        .then(newUser => {
                            res.status(201).json({
                                err: false,
                                message: `Success to add ${newUser.userName}`,
                                data: newUser,
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: `Please input name & password incorrect`
                            })
                        })
                } else {
                    res.status(400).json({
                        message: 'username already registered!'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
}