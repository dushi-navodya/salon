'use strict'
var express  = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors')

require('./models/userGroups');
require('./models/users');
require('./models/stylistCalender')
require('./models/stylists')
require('./models/booking')
//defining the routes 
const UserGroupRoute = require('./routes/userGroups.route');
const UserRoute = require('./routes/user.route');
const StylistsRoute = require('./routes/stylist.route');
const StylistCalendarRoute = require('./routes/stylist.calendar.route')
const StylistBooking = require('./routes/stylist.booking.route')




const port = 8080;
 
// configure middleware
app.set('port', process.env.port || port); // set express to use this port
// app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
// app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client
// app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
// app.use(fileUpload()); // configure fileupload
app.use(cors());

//directing the routes to url
app.use('/userGroup', UserGroupRoute);
app.use('/user', UserRoute);
app.use('/stylist', StylistsRoute);
app.use('/stylistCalendar', StylistCalendarRoute);
app.use('/stylistBooking', StylistBooking)

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});