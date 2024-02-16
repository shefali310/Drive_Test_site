const User = require('../models/User')


fetchDriverDataForResults = async (req, res) => {
    let userdata = null;

    userdata = await User.find({
        UserType: 'Driver',
        TestType: { $ne: 'default' },
        result: { $ne: 'default' },
    });

    res.render('adminViewResults', { userdata })

}


module.exports = { fetchDriverDataForResults: fetchDriverDataForResults }