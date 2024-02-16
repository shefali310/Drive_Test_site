
const app = require('../models/appointmentModel')



saveAdminSlots = async (req, res) => {
    const slotDate = new Date(req.body.bookingDate);
    const timeslots = await app.find({
        date: slotDate,
        Time: req.body.bookingTime,
    });
    if (timeslots.length > 0) {
        res.redirect('/')
    } else {
        await app.create({
            date: req.body.bookingDate,
            Time: req.body.bookingTime,
            isTimeSlotAvailable: true
        })
            .then((data) => {
                if (data) {
                    res.redirect('/')
                }
            })
            .catch((err) => {
                req.flash('err', 0)
                res.redirect('/')
            })
    }
}

// fetching the differnt time slots 
fetchTimeSlots = async (req, res) => {
    try {
        const bookingDate = req.body.bookingDate;
        const newDate = new Date(bookingDate);

        const timeslots = await app.find({
            date: newDate,
        });
        res.json(timeslots)
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}


module.exports = { saveAdminSlots: saveAdminSlots, fetchTimeSlots: fetchTimeSlots }