// // Core Module
// // File System

// const fs = require("fs");

// // writeFile, writeFileSync

// Menuliskan string ke file secara (Synchronous)
// try {
//   fs.writeFileSync("data/hello.txt", "Hello World Secara Synchronous");
// } catch (error) {
//   console.log(error);
// }

// Menuliskan string ke file secara (Asynchronous)
// fs.writeFile("data/hello.txt", "Hello World Secara Asynchronous", (error) => {
//   console.log(error);
// });

// // readFile, readFileSync

// Membaca isi file secara (Synchronous)
// const data = fs.readFileSync("data/hello.txt", "utf-8");
// console.log(data);

// Membaca isi file secara (Asynchronous)
// fs.readFile("data/hello.txt", "utf-8", (error, data) => {
//   if (error) throw error;
//   console.log(data);
// });

// // readline

// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Masukan Nama Anda: ", (nama) => {
//   rl.question("Masukan Nomer Hp Anda: ", (noHp) => {
//     console.log(`Halo nama saya ${nama} dan nomer HP saya ${noHp}`);
//     rl.close();
//   });
// });

// // Chalenge
const { tulisPertanyaan, simpanContacts } = require("./contacts");

const main = async () => {
  const nama = await tulisPertanyaan("Masukan nama anda : ");
  const email = await tulisPertanyaan("Masukan email anda : ");
  const noHp = await tulisPertanyaan("Masukan noHp anda : ");

  simpanContacts(nama, email, noHp);
};
main();
