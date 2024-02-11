const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContacts, findContact } = require("./utils/contacts");
const app = express();
const port = 3000;

// Make EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

// Build Middleware
app.use(express.static("public"));

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
  const contacts = loadContacts();
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Contact Page",
    contacts,
  });
});

app.get("/contact/:name", (req, res) => {
  const contact = findContact(req.params.name);
  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Contact Detail Page",
    contact,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send(`<h1>404 : Not Found!</h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
