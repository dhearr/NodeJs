const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const {
  loadContacts,
  findContact,
  addContact,
  cekDuplicated,
} = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");
const app = express();
const port = 3000;

// Make EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

// Build Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// Page Home
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

// Page About
app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "About Page",
  });
});

// Page Contact
app.get("/contact", (req, res) => {
  const contacts = loadContacts();
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Contact Page",
    contacts,
    message: req.flash("message"),
  });
});

// Page Add New Contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    layout: "layouts/main-layout",
    title: "Add Contact Page",
  });
});

// Proses Data Form
app.post(
  "/contact",
  [
    body("name").custom((value) => {
      const duplicated = cekDuplicated(value);
      if (duplicated) {
        throw new Error("Name already exists / registered, use another name.");
      }
      return true;
    }),
    check("email", "Invalid email!").isEmail(),
    check("phone", "Invalid phone number!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("add-contact", {
        layout: "layouts/main-layout",
        title: "Add Contact Page",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      // send flash message
      req.flash(
        "message",
        "Contact data successfully added, have a nice day :)"
      );
      // redirect
      res.redirect("/contact");
    }
  }
);

// Page Detail Contact
app.get("/contact/:name", (req, res) => {
  const contact = findContact(req.params.name);
  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Contact Detail Page",
    contact,
  });
});

// error page
app.use("/", (req, res) => {
  res.status(404);
  res.send(`<h1>404 : Not Found!</h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
