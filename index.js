const express = require('express')
const path = require('path')
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const expressSession = require('express-session');
const flash = require('connect-flash');


mongoose.connect('mongodb+srv://shefpanchal3:kitchener@cluster0.510al6g.mongodb.net/driver?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB Connection Successfull'))
    .catch((err) => {
        console.error(err);
    });


const app = new express();

app.use(express.static(path.resolve(__dirname + '/public')))
app.use(bodyParser.urlencoded())
app.use(flash())
app.use(express.json());

app.set('view engine', 'ejs');


//differnet controllers 
const createUserController = require('./controllers/SignupUser');
const loginUserController = require('./controllers/LoginUser');
const logoutController = require('./controllers/logout');
const GLicenceController = require('./controllers/GLicence');
const appointmentController = require('./controllers/appointmentController');
const examinerController = require('./controllers/examinerController');
const adminController = require('./controllers/adminController');



const validateMiddleWare = require('./middleware/validationMiddleware');
const authMiddleWare = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleWare = require('./middleware/redirectedIfAuthenticatedMiddleWare')


app.use(expressSession({
    secret: 'session key abc'
}));


global.userSessionId = null;

global.UserType = null;

app.use("*", (req, res, next) => {
    userSessionId = req.session.userId;
    UserType = req.session.UserType;
    next();
})


app.get('/', (req, res) => {
    res.render('Dashboard');
});

app.get('/Login', (req, res) => {
    res.render('Login', { statusCode: req.flash('err') });
});

app.get('/SignUp', (req, res) => {
    res.render('SignUp', { statusCode: req.flash('err') });
});

app.post('/user/signUpUser', createUserController.createUser);

app.post('/loginForm', redirectIfAuthenticatedMiddleWare, loginUserController.loginUser);


app.get('/user/Logout', logoutController);

global.g2data = null;

global.userdata = null;

global.userAppData = null;



app.get('/appointment', authMiddleWare.adminAuth, (req, res) => {
    res.render('appointment');
});

app.get('/G_Page', authMiddleWare.driverAuth, GLicenceController.fetchBylicenceG);


global.userdata = null;

app.get('/G2_Page', authMiddleWare.driverAuth, GLicenceController.fetchByUserId);

app.post('/save/g2FormSubmit', GLicenceController.updateG2Form);

app.post('/gFormSubmit', GLicenceController.updateGForm);

app.post('/save/appointmentSlots', appointmentController.saveAdminSlots);

app.post('/fetchTimeSlots', appointmentController.fetchTimeSlots);

app.get('/PickDriver', authMiddleWare.examinerAuth, examinerController.fetchDriverData);

app.post('/pickDriver', examinerController.pickDriver);

app.get('/Results', authMiddleWare.examinerAuth, examinerController.fetchDriverDataForResults);

app.post('/declareresult', examinerController.declareresult);

app.get('/adminViewResults', authMiddleWare.adminAuth, adminController.fetchDriverDataForResults);

app.use((req, res) => res.render('notfound'));

app.listen(3080, () => {
    console.log('App running on port number 3080');
})