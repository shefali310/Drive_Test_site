
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


mongoose.Promise = global.Promise;

const userSchema = new Schema({
    firstName: { type: String, required: true, default: 'default' },
    lastName: { type: String, required: true, default: 'default' },
    age: { type: Number, required: true, default: 0 },
    licenceNumber: { type: String, required: true, default: 'default' },
    username: { type: String },
    password: { type: String },
    UserType: { type: String },
    appointmentID: { type: String, default: 'default' },
    TestType: { type: String, default: 'default' },
    ExaminerID: { type: String, default: 'default' },
    comment: { type: String, default: 'default' },
    result: { type: String, default: 'default' },
    cardetails: {
        make: { type: String, required: true, default: 'default' },
        model: { type: String, required: true, default: 'default' },
        year: { type: String, required: true, default: 0 },
        plateNumber: { type: String, required: true, default: 'default' }
    }
});

userSchema.pre('save',function(next){    
    const user = this
    bcrypt.hash(user.password,10,(error,hash)=>{
        user.password = hash;
        next();
    })
})

const info = mongoose.model("DriveTest", userSchema);
module.exports = info;