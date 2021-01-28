const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

// use express body parser to get the sent posted [POST] data from any form or fetch uses dataform
app.use(express.urlencoded({extended: true}));
// use express json methond to lett the app read any sent json data usualy from fetch
app.use(express.json());


// set Ejs configuration
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// set the static public folder
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) =>{
    res.render('index');
});

app.get('/about', (req, res) =>{
    res.render('about');
});

app.get('/blog', (req, res) =>{
    res.render('blog');
});

app.post('/blog', (req, res) =>{
    console.log(req.body);
    res.render('blog');
});


app.get('/contact', (req, res) =>{
    res.render('contact');
});

app.get('/marketing', (req, res) =>{
    res.render('marketing');
});

app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
})