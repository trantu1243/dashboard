const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
cors = require('cors')
//const homeRoutes = require('./app/routes/home.routes');
//const userRoutes = require('./app/routes/user.routes');




const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

// Routes
//app.use('/', homeRoutes);
//app.use('/users', userRoutes);

//đọc dữ liệu từ file flag

app.post("/bot/report/:id", (req, res)=>{
  console.log(req.body)


})
app.get("/user/bot_event_info", (req, res)=>{
  res.status(200).send({
    start_time:Math.floor(Date.now() / 1000),
    end_time:Date.now()+100000000000
  })
})
app.get("/admin/services/:id", (req, res)=>{
  res.status(200).send({
    url:"http://host.docker.internal"
  })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
