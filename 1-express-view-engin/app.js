const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

// set public folder
app.use(express.static(__dirname + '/public'));

// use ejs as a view engin
app.set('view engine', 'ejs');

// set views folder
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    // console.log(__dirname);
    //res.sendFile( __dirname + '/views/index.html')
    res.render('index', 
    {
        title: 'this is the page title',
        content: 'this is the page content<br/> this is FBW3 LEI',
        fruits: ['Apple', 'Banana', 'watermelon']
    });
});

app.get('/contact', (req, res) => {
    res.render('contact')
});
// create a new route for About us page ['/aboutus'] and it should render aboutus.ejs view 
// which you should create it inside views folder

// create rout for about us page
app.get('/aboutus', (req, res) => {
    res.render('aboutus');
});


app.listen(port, () => {
    console.log(`App is runing on Port ${port}`);
});


