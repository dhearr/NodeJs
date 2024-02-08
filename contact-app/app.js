const yargs = require("yargs");
const { saveContacts } = require("./contacts");

yargs.command(
  "add",
  "Add New Contact",
  (builder) => {
    builder
      .option("name", {
        describe: "Full Name",
        demandOption: true,
        type: "string",
      })
      .option("email", {
        describe: "Email",
        demandOption: false,
        type: "string",
      })

      .option("phone", {
        describe: "Phone Number",
        demandOption: true,
        type: "string",
      });
  },
  (argv) => {
    saveContacts(argv.name, argv.email, argv.phone);
  }
);

yargs.parse();
