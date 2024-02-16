
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const appointmentSchema = new Schema({
    date: {type: Date, required: true},
    Time:  {type: String, required: true},
    isTimeSlotAvailable: { type: Boolean, required: true, default: true },
    userID: { type: String, default: 'default' }
})
const info = mongoose.model("Appointment", appointmentSchema);
module.exports = info;