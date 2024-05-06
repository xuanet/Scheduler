const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Girl = require('./models/Girl');
const deleteRoutes = require('./routes/deleteRoutes')



const app = express();
const dbURI = 'nn'
mongoose.connect(dbURI)
    .then(() => {
        console.log("Connected to DB");
        app.listen(3000, () => {
            console.log();
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.set('view engine', 'ejs');
// YOU NEED THIS LINE TO PROCESS HTML SUBMITTED DATA
app.use(express.urlencoded({ extended: true }));
app.use(express.static('images'));
app.use(express.static('styles'));


app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/build-a-girl', (req, res) => {
    res.render('build-a-girl');
});

app.post('/build-a-girl', (req, res) => {
    const newGirl = new Girl(req.body);
    console.log(newGirl.specialty);
    newGirl.save()
        .then(() => {
            res.redirect('/build-a-girl');
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/wishlist', (req, res) => {
    Girl.find()
        .sort({name: 1})
        .then((result) => {
            res.render('wishlist', {
                girls: result
            });
        })
        .catch((err) => {
            console.log("wishlist error: ", err);
        });
});

app.use('/delete', deleteRoutes);

app.get('/makegirl', (req, res) => {
    const newGirl = new Girl({
        name: 'Katy',
        height: 165,
        weight: 54,
        specialty: 'butt',
        race: 'asian',
        comments: 'i look big booty asian girls'
    });
    newGirl.save()
        .then(() => {
            res.redirect('/home');
        })
        .catch((err) => {
            console.log("makegirl error: ", err);
        });
});

app.get('/samples', (req, res) => {
    res.render('samples');
});

app.get('/btd', (req, res) => {
    res.render('btd');
});

app.get('/btdwiki', (req, res) => {
    res.render('btdwiki');
});

app.get('/hgl', (req, res) => {
    res.render('hgl');
});

app.get('/mason', (req, res) => {
    res.render('mason');
});

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.use((req, res) => {
    res.status(404).render('404');
});