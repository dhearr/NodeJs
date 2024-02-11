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

// menimpa / menuliskan file contacts.json dengan data yang baru
const saveContacts = (contacts) => {
  fs.writeFileSync(dataPath, JSON.stringify(contacts));
};

// menambahkan data contact baru
const addContact = (contact) => {
  const contacts = loadContacts();
  contacts.push(contact);
  saveContacts(contacts);
};

// Cek Duplicated Name
const cekDuplicated = (name) => {
  const contacts = loadContacts();
  return contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );
};

module.exports = { loadContacts, findContact, addContact, cekDuplicated };
