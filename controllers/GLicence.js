const User = require('../models/User.js')
const app = require('../models/appointmentModel')

fetchByUserId = async (req, res) => {
    let userdata = null;
    let bookingSlots = null;

    const todayDate = new Date();
    const tomorrowDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 1);

    if (req.session.userId && req.session.UserType == "Driver") {
        userdata = null;
        userdata = await User.find({
            _id: req.session.userId,
        });

        bookingSlots = await app.find({
            date: { $gte: todayDate }
        });

        userAppData = await app.find({
            userID: req.session.userId,
        });


        res.render('G2_Page', { userdata, bookingSlots, userAppData })
    }
    else {
        res.redirect('/')
    }
}

// fetch details by userId
fetchBylicence = async (req, res) => {
    let userdata = null;
    let bookingSlots = null;

    const todayDate = new Date();
    const tomorrowDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 1);

    if (req.session.userId && req.session.UserType == "Driver") {
        userdata = null;
        userdata = await User.find({
            _id: req.session.userId,
        });

        bookingSlots = await app.find({
            date: { $gte: todayDate }
        });

        userAppData = await app.find({
            userID: req.session.userId,
        });

        res.render('G2_Page', { userdata, bookingSlots, userAppData })
    }
    else {
        res.redirect('/')
    }
}


// fetch details by userId
fetchBylicenceG = async (req, res) => {
    let userdata = null;
    let bookingSlots = null;

    const todayDate = new Date();
    const tomorrowDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 1);

    if (req.session.userId && req.session.UserType == "Driver") {
        userdata = null;
        userdata = await User.find({
            _id: req.session.userId,
        });

        bookingSlots = await app.find({
            date: { $gte: todayDate }
        });

        userAppData = await app.find({
            userID: req.session.userId,
        });


        res.render('G_Page', { userdata, bookingSlots, userAppData })
    }
    else {
        res.redirect('/')
    }
}

updateG2Form = async (req, res) => {
    await User.findOneAndUpdate(
        { _id: req.session.userId },
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            licenceNumber: req.body.licenceNumber,
            appointmentID: req.body.Time,
            TestType: 'G2',
            cardetails: {
                make: req.body.make,
                model: req.body.model,
                year: req.body.year,
                plateNumber: req.body.plateNumber
            },
        }
    );

    await app.findOneAndUpdate({ _id: req.body.Time },
        {
            isTimeSlotAvailable: false,
            userID: req.session.userId
        });
    res.redirect("/")
}


updateGForm = async (req, res) => {
    await User.findOneAndUpdate(
        { _id: req.session.userId },
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            licenceNumber: req.body.licenceNumber,
            appointmentID: req.body.Time,
            TestType: 'G',
            cardetails: {
                make: req.body.make,
                model: req.body.model,
                year: req.body.year,
                plateNumber: req.body.plateNumber
            },
        }
    );

    await app.findOneAndUpdate({ _id: req.body.Time },
        {
            isTimeSlotAvailable: false,
            userID: req.session.userId
        });
    res.redirect("/")
}


module.exports = { fetchByUserId: fetchByUserId, fetchBylicence: fetchBylicence, updateG2Form: updateG2Form, updateGForm: updateGForm, fetchBylicenceG: fetchBylicenceG };
