// requrie express in index.js file
const express = require('express');
const app = express();

// declare 10 movie names to form a json array
Let movies = [
{ title : 'Harry Potter'},
{ title : 'Lord of Rings'},
{ title : 'Titanic'},
{ title : 'Horror Movie'},
{ title : 'Comedy Movie'},
{ title : 'Family Movie'},
{ title : 'Action movie'},
{ title : 'Prison Break'},
{ title : 'Real Strory'},
{ title : 'Children movie'}
];
// return the textual response
app.get('/', (req, res) => {
  let responseText = 'Welcome to my app!';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});
// using express static
app.use(express.static('public'));

// middleware

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(myLogger);
app.use(requestTime);

app.get('/Movies', (req, res) => {
  res.json(movies);
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
