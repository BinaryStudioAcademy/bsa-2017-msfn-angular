const bodyParser = require('body-parser'),
    context = require('./units/context'),
    express = require('express'),
    mongooseConnection = require('./db/dbConnect').connection,
    path = require('path'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    sessionSecret = require('./config/session').secret,
    mongoose = require('mongoose'),
    passport = require('passport'),
    isLogged = require('./middleware/passportStrategyMiddleware').isLogged,
    cookieParser = require('cookie-parser'),
    port = 3060;

const app = express();

app.use(session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongooseConnection
    })
}));

context.mongoStore = new MongoStore({
    mongooseConnection: mongooseConnection
});

app.use(passport.initialize());
app.use(passport.session());

//middleware for checking authorized user (if auth { next() } else { redirect to '/'})
app.use('/profile/*', isLogged);

const staticPath = path.resolve(__dirname + '/../dist');
app.use(express.static(staticPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function (req, res, next) {
    // console.log(req.session.user);
    next();
});

const apiRoutes = require('./routes/api/routes')(app);
const viewRoutes = require('./routes/view/routes')(app);

console.log(`app runs on port: ${port}`);
const server = app.listen(port);

module.exports = app;
