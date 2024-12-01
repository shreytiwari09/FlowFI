const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const authRoute = require('./routes/authRoute');
const transactionRoute = require('./routes/transactionRoute')

const app = express();
const PORT = process.env.PORT || 8000;

const uri = process.env.MONGO_DB_CONNECTION_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB Connected Successfully!!!");
}).catch((error) => {
  console.error("Error connecting MongoDB", error);
});

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));
app.use(express.static(path.resolve('./assets')));
app.use(express.static(path.resolve('./scripts')));
app.use(express.json());

app.use('/api/auth',authRoute);
app.use('/api/transaction',transactionRoute);

app.get('/', (req, res) => {
    return res.render('1');
});

app.get('/expense', (req, res) => {
    return res.render('expense');
});

app.get('/login', (req, res) => {
    return res.render('login');
});

app.get('/register', (req, res) => {
    return res.render('register');
});

app.get('/hearfrom', (req, res) => {
    return res.render('hearfrom');
});

app.get('/forgot', (req, res) => {
    return res.render('forgot');
});
app.get('/useraccount', (req, res) => {
    return res.render('useraccount');
});
app.get('/ques', (req, res) => {
    return res.render('ques');
});
app.get('/entry', (req, res) => {
    return res.render('entry');
});






app.listen(PORT, () => {
    console.log(`Server is listening on  port -> ${PORT}`);
    console.log(`\n\nhttp://localhost:${PORT}\n\n`);
})