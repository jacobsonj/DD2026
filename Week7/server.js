//1. setup a node app with command: npm init  
//2. install express with command: npm install express
//3. create a file named server.js and add the following code

const express = require('express');
const app = express();
const port = 3000;



const hbs = require('express-handlebars');

app.engine('handlebars', hbs.engine());
app.set('view engine', 'handlebars');


// the path module is used to work with file and directory paths
const path = require('path');

//set up db connection
const mongoose = require('mongoose');

//create schema
const destinationSchema = new mongoose.Schema({
    page: String,
    name: String,
    description: String,
    image: String
});

//create model
const Destination = mongoose.model('destinations', destinationSchema);

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/travelsite');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main().catch(err => console.log(err));



// review middleware in express under week 7 in blackboard
app.use(express.static( path.join(__dirname, 'static'))); //this line tells express to serve static files from the 'static' directory


//parse the body of incoming requests with urlencoded payloads (like form submissions)
app.use(express.urlencoded({ extended: true }));

//generate routese
app.get('/', (req, res) => {
   res.render('home', { "title": "Welcome to our Travel Site" });
});

//generate routes to populate destinations page
app.post('/destinations', async (req, res) => {
    //Destinations Route.
    //code to add a new destinaiton to the database

    //this creates 4 variables that take the name of the keys in the req.body object and assigns them the corresponding values from the req.body object.
    const { page, name, description, image } = req.body;

    console.log(req.body);
    //use the Destination model to query the database and get all destinations
    const newDestination = new Destination({
        page,
        name,
        description,
        image
    });
    await newDestination.save();
    // res.redirect('/destinations');
    res.send('Destination added successfully');
});

app.get('/destinations', async (req, res) => {
    //Destinations Route.
    //code to query the database and get all destinations
    //.lean() formats mongodb data into a format that can be easily rendered in a template engine like handlebars
    const destinations = await Destination.find().lean();
    res.render('destinations', { "destinations": destinations, "title": "Destinations" });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});