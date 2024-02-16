const User = require('../models/User')

driverAuth = (req, res, next) => {
    User.findById(req.session.userId)
        .then((user) => {
            if (req.session.UserType != "Driver") {
                return res.redirect('/')
            }
        })
        .catch((err) => {
            console.error(err);
        });
    next();
}

adminAuth = (req, res, next) => {
    User.findById(req.session.userId)
        .then((user) => {
            if (req.session.UserType != "Admin") {
                return res.redirect('/')
            }
        })
        .catch((err) => {
            console.error(err);
        });
    next();
}

examinerAuth = (req, res, next) => {
    User.findById(req.session.userId)
        .then((user) => {
            if (req.session.UserType != "Examiner") {
                return res.redirect('/')
            }
        })
        .catch((err) => {
            console.error(err);
        });
    next();
}

module.exports = { driverAuth: driverAuth, adminAuth: adminAuth, examinerAuth: examinerAuth };