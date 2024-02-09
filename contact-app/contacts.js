const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// Membuat Folder jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat File jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// Loadt Contact
const loadContact = () => {
  const file = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

// Save Contacts
const saveContacts = (name, email, phone) => {
  const contact = { name, email, phone };
  const contacts = loadContact();

  // cek duplicate name
  const duplicate = contacts.find((contact) => contact.name === name);
  if (duplicate) {
    console.log(
      chalk.red.inverse.underline(
        `Contact with the name ${name} is already registered, use another name`
      )
    );
    return;
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(
        chalk.red.inverse.underline(
          "You have entered an incorrect Email Format, please try again."
        )
      );
      return;
    }
  }

  // cek phone number
  if (!validator.isMobilePhone(phone, "id-ID")) {
    console.log(
      chalk.red.inverse.underline(
        "You have entered an incorrect Phone Number Format, please try again."
      )
    );
    return;
  }

  contacts.push(contact);

  fs.writeFileSync(dataPath, JSON.stringify(contacts));
  console.log(
    chalk.green.inverse.underline(
      `Thank you ${name}, we have saved the data, have a nice day. :)`
    )
  );
};

// List Contact
const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse("Contact List : "));
  contacts.forEach((contact, i) => {
    console.log(
      chalk.underline(`${i + 1}. ${contact.name} - ${contact.phone}`)
    );
  });
};

// Detail Contact
const detailContact = (name) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (data) => data.name.toLowerCase() === name.toLowerCase()
  );
  if (!contact) {
    console.log(
      chalk.red.inverse.underline(`Contact with name ${name} not found`)
    );
    return;
  }
  console.log(chalk.cyan.inverse(`Detail Contact : `));
  console.log(`Name : ${contact.name}`);
  console.log(`Phone Number : ${contact.phone}`);
  if (contact.email) {
    console.log(`Email : ${contact.email}`);
  }
};

// Delete contact
const deleteContact = (name) => {
  const contacts = loadContact();
  const newContact = contacts.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase()
  );
  if (contacts.length === newContact.length) {
    console.log(
      chalk.red.inverse.underline(`Contact with name ${name} not found!`)
    );
    return;
  }
  fs.writeFileSync(dataPath, JSON.stringify(newContact));
  console.log(
    chalk.green.inverse.underline(`Contact ${name} has been deleted!`)
  );
};

module.exports = { saveContacts, listContact, detailContact, deleteContact };
