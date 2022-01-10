const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@mail.com",
    password: bcrypt.hashSync("123123", 10),
  },
  {
    name: "John Doe",
    email: "john@mail.com",
    password: bcrypt.hashSync("123123", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@mail.com",
    password: bcrypt.hashSync("123123", 10),
  },
];

module.exports = users;
