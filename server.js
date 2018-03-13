var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var log4js = require('log4js');
var _ = require('underscore');

log4js.configure({
    appenders: {
      out : { type: 'console' },
      adminLog : { type: 'file', filename: 'logs/admin.log',"maxLogSize": 1000000,"backups": 10,"pattern": "-yyyy-MM-dd","compress": true}
    },
    categories : {
      admin : {appenders : ['adminLog'],level : 'info'},
      default : {appenders : ['adminLog'],level : 'info'}
    }
});

var loggerAdmin = log4js.getLogger('admin');
var port = process.env.PORT || 80;
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false });
require('./config/passport')(passport);
var app = express();
// Configure view engine to render EJS templates.
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.locals.moment = require('moment');

app.use('/public',express.static(__dirname + '/public'));

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(bodyParser({uploadDir:'./uploads'}));
app.use(require('express-session')(
	{
	     secret: 'keyboard cat',
	     resave: true,
	     saveUninitialized: true,
	     cookie : {
 		       maxAge: 1000*60*60*60
	    }
	}
));

app.enable('trust proxy');

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

require('./router/mainRoutes.js')(app,loggerAdmin);
require('./router/userManage.js')(app,loggerAdmin);

//Have to set this use function under the last router
app.use(function(req, res, next) {
    console.log("[MIDDELWARE DETECT]")
    // console.log(err.statck)
    res.status(400);
    if(req.user){
        res.render('404');
      }else{
        res.render('404');
      }
});

app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err);
  res.status(500).render('404page',{message : '현재 예약 사이트 서버 점검 중에 있습니다. 더 나은 환경을 위해 잠시만 기다려주세요!'}); 
});

app.listen(port, function() {
    console.log('server listening on port: '+ port);
})
