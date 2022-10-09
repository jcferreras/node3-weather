const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { query } = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define Paths for Express
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

//Handlebars View Setup
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

//Setup Static Directory
app.use(express.static(publicDir));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'JC Ferreras'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'JC Ferreras'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'JC Ferreras'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, { weatherdesc, temperature, feelslike } = {}) => {
      if (error) {
        return res.send({ error });
      } else {
        return res.send({
          weatherdesc,
          temperature,
          feelslike,
          address: req.query.address
        });
      }
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('helparticle', {
    title: 'Help Article',
    name: 'JC Ferreras'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error 404',
    name: 'JC Ferreras'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
