const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const app = express();
const port = 3000;

// Make EJS
app.set("view engine", "ejs");

// Third Party Middleware
app.use(expressLayouts);
app.use(morgan("dev"));

// Build Middleware
app.use(express.static("public"));

// Application level midleware
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "dhea ramdani",
      email: "dhea@gmail.com",
    },
    {
      nama: "afani akhira",
      email: "afani@gmail.com",
    },
    {
      nama: "kevin nugraha",
      email: "kevin@gmail.com",
    },
  ];
  res.render("index", {
    layout: "layouts/main-layout",
    nama: "Dhea Ramdani",
    title: "Home Page",
    mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "About Page",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Contact Page",
  });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product Id : ${req.params.id} <br> Category : ${req.query.category}`
  );
});

app.use("/", (req, res) => {
  res.status(404);
  res.send(`<h1>404 : Not Found!</h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
