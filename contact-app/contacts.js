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

// Save Contacts
const saveContacts = (name, email, phone) => {
  const contact = { name, email, phone };

  const file = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(file);

  // cek duplicate name
  const duplicate = contacts.find((contact) => contact.name === name);
  if (duplicate !== undefined) {
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

module.exports = { saveContacts };
