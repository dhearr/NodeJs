const fs = require("fs");

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

// Load Contact
const loadContacts = () => {
  const file = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

// Detail Contact
const findContact = (nama) => {
  const contacts = loadContacts();
  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === nama.toLowerCase()
  );
  return contact;
};

module.exports = { loadContacts, findContact };
