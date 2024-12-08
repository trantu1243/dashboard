const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config()

const authRouter = require('./routes/auth');
const teamRouter = require('./routes/team.route');
const flagRouter = require('./routes/flag.route');
const submitRouter = require('./routes/submit.route');


const User = require('./models/User');
const authMiddleware = require('./middleware/auth');
const teamMiddleware = require('./middleware/teamMiddleware');
const Team = require('./models/team');
const Flag = require('./models/flag');

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URL);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
  secret: 'quanlisinhvien_secret',
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.use('/auth', authRouter);
app.use('/team', teamRouter);
app.use('/flag', flagRouter);
app.use('/submit', submitRouter);

app.get('/', (req, res) => res.redirect('/team'));

let time = {};

let current_round = 0;

const rounds = [15, 15, 10, 10, 10, 10, 10, 10];

let numberOfRound = 9;

// bắt đầu game 
app.post('/start-game', authMiddleware, async (req, res) => {
  await Team.updateMany({}, { $set: { score: 0 } });
  await Flag.updateMany({}, { $set: { check: false } });
  current_round ++;
  const dateNow = Math.floor(Date.now() / 1000);
  time = {
    start_time: dateNow,
    end_time: dateNow + rounds[current_round - 1] * 60,
    current_round: current_round
  }
  numberOfRound = req.body.numberOfRound;
  res.redirect('/team');
})

// Dịch vụ bị gián đoạn => +10s
app.post("/bot/report/:id", teamMiddleware, async (req, res)=>{
  const team = await Team.findById(req.team.id);
  if (!req.body.status) {
    team.interruptionTime += 10;
    await team.save();
  }
  console.log(req.body);
  return res.status(200);
})


app.get("/user/bot_event_info", teamMiddleware, async (req, res)=>{
  const dateNow = Math.floor(Date.now() / 1000);

  // quá thời gian thì tính điểm và chuyển sang round tiếp theo
  if (dateNow > time.end_time) {
    const team = await Team.findById(req.team.id);

    let defTime = 600;
    if (current_round > rounds.length) defTime = 120;
    else if (rounds[current_round - 1] === 10) defTime = 300;

    if (defTime >= team.interruptionTime) {
      team.score += 40;
      await team.save()
    }


    current_round ++ 
    const dateNow = Math.floor(Date.now() / 1000);
    const minute = current_round <= 8 ? rounds[current_round - 1] : 5;
    time = {
      start_time: dateNow,
      end_time: dateNow + minute * 60,
      current_round: current_round
    }

    // hết các round thì dừng game
    if (current_round > numberOfRound) {
      time = {}
      current_round = 0
    }
  }
  res.status(200).send(time);
})
app.get("/admin/services/:id", teamMiddleware, (req, res)=>{
  res.status(200).send({
    url:"http://host.docker.internal"
  })
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Run the script
// generateDiemData();

async function test(){
  const username = 'admin123';
  const password = 'admin@036203';

  const user = new User({ username, password });
  await user.save();
}

//test()

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app;
