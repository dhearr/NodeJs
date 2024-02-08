const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

// Pertanyaan
const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (result) => {
      resolve(result);
    });
  });
};

// Simpan Contacts
const simpanContacts = (nama, email, noHp) => {
  const contact = { nama, email, noHp };

  const file = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(file);

  contacts.push(contact);

  fs.writeFileSync(dataPath, JSON.stringify(contacts));
  console.log(
    `Terimakasih ${nama}, data sudah kami simpan. Have a nice day ${nama}. :)`
  );

  rl.close();
};

module.exports = {
  tulisPertanyaan,
  simpanContacts,
};
