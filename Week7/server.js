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
const pageSchema = new mongoose.Schema({
    slug: String, //about-us friednly url
    name: String, //About us
    description: String,
});

const gallerySchema = new mongoose.Schema({
    name: String,
    description: String,

});
const imageSchema = new mongoose.Schema({
    url: String,
    caption: String,
    gallery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'galleries'
    },
});

gallerySchema.virtual('images', {
    ref: 'images',
    localField: '_id',
    foreignField: 'gallery',
    // justOne: true
});

const destinationSchema = new mongoose.Schema({
    page: String,
    name: String,
    description: String,
    image: String
}, {
    virtuals: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

destinationSchema.virtual('activities', {
    ref: 'activities',
    localField: '_id',
    foreignField: 'destination'
});

//activities schema for things to do in each destination
const activitySchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    cost: Number,
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'destination' },
});


//create model
const Destination = mongoose.model('destinations', destinationSchema);

const Activity = mongoose.model('activities', activitySchema);

const Page = mongoose.model('pages', pageSchema);

const Gallery = mongoose.model('galleries', gallerySchema);

const Image = mongoose.model('images', imageSchema);

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/travelsite');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main().catch(err => console.log(err));



// review middleware in express under week 7 in blackboard
app.use(express.static(path.join(__dirname, 'static'))); //this line tells express to serve static files from the 'static' directory


//parse the body of incoming requests with urlencoded payloads (like form submissions)
app.use(express.urlencoded({ extended: true }));

//generate routese
app.get('/', async (req, res) => {
    const homepage = await Page.findOne({ slug: 'home' }).lean();
    const gallery = await Gallery.findOne({ name: 'home' }).populate('images').lean();
    const destinations = await Destination.find().lean();
    console.log(homepage);
    console.log(gallery);
    res.render('home', {
        "title": homepage.name,
        "homepage": homepage,
        "galleryImages": gallery.images,
        "destinations": destinations
    });
});

//generate routes to populate destinations page
app.post('/destinations', async (req, res) => {
    //Destinations Route.
    //code to add a new destinaiton to the database

    //this creates 4 variables that take the name of the keys in the req.body object and assigns them the corresponding values from the req.body object.
    const { page, name, description, image } = req.body;

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

app.post('/activities', async (req, res) => {
    //Activities Route.
    //code to add a new activity to the database

    const { name, description, image, cost, destination } = req.body;

    const newActivity = new Activity({
        name,
        description,
        image,
        cost,
        destination
    });
    await newActivity.save();
    res.send('Activity added successfully');
});

app.get('/destinations', async (req, res) => {
    //Destinations Route.
    //code to query the database and get all destinations
    //.lean() formats mongodb data into a format that can be easily rendered in a template engine like handlebars
    const destinations = await Destination.find().lean();
    res.render('destinations', { "destinations": destinations, "title": "Destinations" });
});

//get a specific destination by id
app.get('/destinations/:id', async (req, res) => {
    const id = req.params.id;
    const destination = await Destination.findById(id).populate('activities').lean();

    res.render('details', {
        "destination": destination,
        "title": destination.name,
        "activities": destination.activities
    });
});

// create a new page
app.post('/pages', async (req, res) => {
    const { slug, name, description } = req.body;

    const newPage = new Page({
        slug,
        name,
        description
    });
    await newPage.save();
    res.send('Page added successfully');
});

//Create a new gallery
app.post('/galleries', async (req, res) => {
    const { name, description } = req.body;

    const newGallery = new Gallery({
        name,
        description
    });
    await newGallery.save();
    res.send('Gallery added successfully');
});

//Create a new image
app.post('/images', async (req, res) => {
    const { url, caption, gallery } = req.body;

    const newImage = new Image({
        url,
        caption,
        gallery
    });
    await newImage.save();
    res.send('Image added successfully');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});