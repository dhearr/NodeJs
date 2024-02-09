const yargs = require("yargs");
const {
  saveContacts,
  listContact,
  detailContact,
  deleteContact,
} = require("./contacts");

// Add Contact
yargs
  .command(
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
  )
  .demandCommand();

// View all list name & phone number contact
yargs.command("list", "View all list name & phone number contact", () => {
  listContact();
});

// Show contact details
yargs.command(
  "detail",
  "Show contact details by name",
  (builder) => {
    builder.option("name", {
      describe: "Full Name",
      demandOption: true,
      type: "string",
    });
  },
  (argv) => {
    detailContact(argv.name);
  }
);

// Delete contact by name
yargs.command(
  "delete",
  "Delete contact by name",
  (builder) => {
    builder.option("name", {
      describe: "Full Name",
      demandOption: true,
      type: "string",
    });
  },
  (argv) => {
    deleteContact(argv.name);
  }
);

yargs.parse();
