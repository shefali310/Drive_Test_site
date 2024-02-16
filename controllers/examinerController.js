const User = require('../models/User')


fetchDriverData = async (req, res) => {
    let userdata = null;

        userdata = await User.find({
            UserType: 'Driver',
            TestType: { $ne: 'default' },
            result: 'default'
        });
        res.render('PickDriver', { userdata })
    
}

pickDriver = async (req, res) => {
        await User.findOneAndUpdate({ _id: req.body.userID },
        {
            ExaminerID: req.session.userId,
        });
        res.redirect("/PickDriver")
}
 
fetchDriverDataForResults = async (req, res) => {
    let userdata = null;

        userdata = await User.find({
            UserType: 'Driver',
            TestType: { $ne: 'default' },
            result: 'default',
            ExaminerID: req.session.userId,
        });
    
        res.render('Results', { userdata })
    
}

declareresult = async (req, res) => {
        await User.findOneAndUpdate({ _id: req.body.userID },
        {
            comment: req.body.comment,
            result: req.body.result,
        });
        res.redirect("/Results")
}

module.exports = {fetchDriverData:fetchDriverData, pickDriver:pickDriver,fetchDriverDataForResults:fetchDriverDataForResults,declareresult:declareresult}