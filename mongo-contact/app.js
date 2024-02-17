const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");

const Contact = require("./model/contact");
require("./utils/db");

const app = express();
const port = 3000;

// Setup Method Override
app.use(methodOverride("_method"));

// Setup EJS
app.set("view engine", "ejs");
app.use(expressLayouts);
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
  res.render("index", {
    layout: "layouts/main-layout",
    title: "Home Page",
  });
});

// Page Contact
app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();

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

// Proses Add Data Form
app.post(
  "/contact",
  [
    body("name").custom(async (value) => {
      const duplicated = await Contact.findOne({ name: value });
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
      res.render("add-contact", {
        layout: "layouts/main-layout",
        title: "Add Contact Page",
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(req.body).then(() => {
        // send flash message
        req.flash(
          "message",
          "Contact data successfully added, have a nice day :)"
        );
        // redirect
        res.redirect("/contact");
      });
    }
  }
);

// Proccess Delete Contact
app.delete("/contact", (req, res) => {
  Contact.deleteOne({ _id: req.body._id }).then(() => {
    req.flash(
      "message",
      "Contact data successfully deleted, have a nice day :)"
    );
    res.redirect("/contact");
  });
});

// Page Edit Contact
app.get("/contact/edit/:name", async (req, res) => {
  const contact = await Contact.findOne({ name: req.params.name });

  res.render("edit-contact", {
    layout: "layouts/main-layout",
    title: "Edit Contact Page",
    contact,
  });
});

// Proses Edit Contact
app.put(
  "/contact",
  [
    body("name").custom(async (value, { req }) => {
      const duplicated = await Contact.findOne({ name: value });
      if (value !== req.body.oldName && duplicated) {
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
      res.render("edit-contact", {
        layout: "layouts/main-layout",
        title: "Edit Contact Page",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
          },
        }
      ).then(() => {
        // send flash message
        req.flash(
          "message",
          "Contact data successfully updated, have a nice day :)"
        );
        res.redirect("/contact");
      });
    }
  }
);

// Page Detail Contact
app.get("/contact/:name", async (req, res) => {
  const contact = await Contact.findOne({ name: req.params.name });

  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Contact Detail Page",
    contact,
  });
});

// Port
app.listen(port, () => {
  console.log(`Mongo Contact | listening on http://localhost:${port}`);
});
