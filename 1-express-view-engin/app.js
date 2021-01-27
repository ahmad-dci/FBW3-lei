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
    res.render('index', {title: 'this is the page title', content: 'this is the page content<br/> this is FBW3 LEI'});
});

app.get('/contact', (req, res) => {
    res.render('contact')
})


app.listen(port, () => {
    console.log(`App is runing on Port ${port}`);
});


