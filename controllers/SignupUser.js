const mongoose = require('mongoose');
const User = require('../models/User.js')
const path = require('path');

createUser = async (req, res) => {

    const { username, password, reenterpassword } = req.body;
    await User.findOne({ username: username })
        .then((user) => {
            if (user) {
                req.flash('err', 1)
                res.redirect('/SignUp')
            }
            else {
                if (reenterpassword != password) {
                    req.flash('err', 2)
                    res.redirect('/SignUp')
                }
                else {
                    User.create(req.body)
                        .then(() => {
                            console.log('Data Inserted Successfully');
                            res.redirect('/Login')
                        })
                        .catch((err) => {
                            req.flash('err', 0)
                            res.redirect('/SignUp')
                        })
                }
            }
        })
        .catch((err) => {
            res.redirect('/SignUp')
        })



}

module.exports = { createUser: createUser };
