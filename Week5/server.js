//1. setup a node app with command: npm init  
//2. install express with command: npm install express
//3. create a file named server.js and add the following code

const express = require('express');
const app = express();
const port = 3000;

const hbs = require('express-handlebars');

app.engine('handlebars', hbs.engine());
app.set('view engine', 'handlebars');
//app.set('views', './views');

// the path module is used to work with file and directory paths
const path = require('path');


app.use(express.static( path.join(__dirname, 'static'))); //this line tells express to serve static files from the 'static' directory

//generate routese
app.get('/', (req, res) => {
    //sendFile is used to send a file as a response to the client
    let filePath = path.join(__dirname, 'static', 'homepage.html');
    res.sendFile(filePath);
});

app.get('/about', (req, res) => {
    //sendFile is used to send a file as a response to the client
    let filePath = path.join(__dirname, 'static', 'about.html');
    res.sendFile(filePath);
});

//rendering templates
app.get('/home', (req, res) => {
    res.render('home', {title: "My Webstite's homepage"});
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});