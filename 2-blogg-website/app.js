const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

// set Ejs configuration
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// set the static public folder
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) =>{
    res.render('index');
})

app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
})