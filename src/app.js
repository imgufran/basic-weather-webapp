const path = require("path");

const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

// File paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("views", viewPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Gufran",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Gufran",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is a help message",
    title: "Help",
    name: "Gufran",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  //? First, get the coordinates
  geocode(req.query.address, (error, { lat, lng, location } = {}) => {
    // Guard clause with early return.
    if (error) {
      return res.send({
        error,
      });
    }

    //? Second, get the weather
    forecast(lat, lng, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }

      // Success
      res.send({
        location,
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);

  res.send({
    products: [],
  });
});

//* Help 404
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Help article not found",
    name: "Gufran",
  });
});

//* Generic 404
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Page not found",
    name: "Gufran",
  });
});

//* Start up the server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
