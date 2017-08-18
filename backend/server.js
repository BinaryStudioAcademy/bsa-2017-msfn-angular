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
    useragent = require('express-useragent'),
    blockUserAgentMiddleware = require('./middleware/blockUserAgentMiddleware'),
    initService = require('./services/initService')(),
    apiResponse = require('express-api-response'),
    port = 3060;

const app = express();

context.mongoStore = new MongoStore({
    mongooseConnection: mongooseConnection
});

// empty arrays don't throw 404 response error
apiResponse.options({
    emptyArrayIsOk: true
});

app.use(session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    store: context.mongoStore
}));

app.use(useragent.express());
app.use(blockUserAgentMiddleware);

app.use(passport.initialize());
app.use(passport.session());

//middleware for checking authorized user (if auth { next() } else { redirect to '/'})
app.use('/profile/*', isLogged);

app.use('/dist', express.static(path.resolve(__dirname + '/../dist')));
app.use('/resources', express.static(path.resolve(__dirname + '/../resources')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const apiRoutes = require('./routes/api/routes')(app);
const viewRoutes = require('./routes/view/routes')(app);

console.log(`app runs on port: ${port}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
const config = require('./config');
console.log(`config: ${config}`);
const server = app.listen(port);

const io = require('socket.io')(server);
const sockets = require('./middleware/socketMiddleware')(io, context.mongoStore);

module.exports = app;
