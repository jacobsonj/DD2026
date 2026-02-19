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

//data
const directory = require('./data/directory.json');
const { dir } = require('console');

console.log(directory);


//generate routese
app.get('/', (req, res) => {
    //sendFile is used to send a file as a response to the client
    let filePath = path.join(__dirname, 'static', 'homepage.html');
    res.sendFile(filePath);
});

// app.get('/about', (req, res) => {
//     //sendFile is used to send a file as a response to the client
//     let filePath = path.join(__dirname, 'static', 'about.html');
//     res.sendFile(filePath);
// });

//rendering templates
app.get('/home', (req, res) => {
    res.render('home', {title: "My Webstite's homepage"});
});
app.get('/about', (req, res) => {
    res.render('about', {title: "My Webstite's about page"});
});

//res.render uses a template engine to render a template and send it as a response to the client. The first argument is the name of the template (without the file extension) and the second argument is an object that contains the data to be passed to the template.
app.get('/directory/:id', (req, res) => {
    const id = req.params.id;

    let person = directory.find(p => p.id === parseInt(id));

    res.render(
        "person", {person: person, title: person.first_name + " " + person.last_name}
    )
});


app.get("/person/add", (req, res) => {
    console.log("request params", req.params);
    console.log("request query", req.query);

    directory.push({
        id: req.query.id,
        first_name: req.query.first_name,
        last_name: req.query.last_name,
        email: req.query.email,
        address_line_1: req.query.address_line_1,
        city: req.query.city,
        state: req.query.state,
        zip: req.query.zip
    });
    console.log(directory);

    res.send("this is the add person page");
});


app.get('/api/items', (req, res) => {
    res.send("this is a get response from api/items")
});
app.post('/api/items', (req, res) => {
    res.send("this is a post response from api/items")
});
app.put('/api/items/:id', (req, res) => {
    res.send("this is a put response from api/items")
});
app.delete('/api/items/:id', (req, res) => {
    res.send("this is a delete response from api/items")
});


//Directory route
app.get('/directory', (req, res) => {
    res.render('directory', {directory: directory});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});