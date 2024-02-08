// const validator = require("validator");
import validator from "validator";
import chalk from "chalk";
import chalkTemplate from "chalk-template";

// console.log(validator.isEmail("dhea@gmail.com"));
// console.log(validator.isMobilePhone("08123456789", "id-ID"));
// console.log(validator.isNumeric("123"));
// console.log(chalk.italic.bgWhite.blue("dhea ramdani"));
const nama = "dhea ramdani";
const pesan = chalkTemplate`Lorem ipsum dolor {bgRed.black sit amet} {bold.bgGreen consectetur adipisicing elit.} Odit, beatae!, Nama saya ${nama}`;
console.log(pesan);
