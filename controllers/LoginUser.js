const bcrypt = require('bcrypt');
const User = require('../models/User.js')
const path = require('path');

loginUser = async(req, res) => {

    const {username, password} = req.body;

    await User.findOne({ username: username })
    .then((user) => {
            if(user){
            bcrypt.compare(password, user.password, (error,same) => {
                if(same){
                    req.session.userId = user._id;
                    req.session.UserType = user.UserType;
                    res.redirect('/')
                } else {
                    req.flash('err', 1)
                    res.redirect('/Login')
                }
            })
        }
            else {
            req.flash('err', 2)
            res.redirect('/Login')
        }
    })
    .catch((err) => {
        req.flash('err', 0)
        res.redirect('/Login')
    })   
}

module.exports = {loginUser:loginUser};
