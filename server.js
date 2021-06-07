const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

// Database connection
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "",
    database: "smart-brain",
  },
});

// Test connection
// db.select("*")
//   .from("users")
//   .then((data) => {
//     console.log(data);
//   });

const PORT = 3000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  db.select("*")
    .from("users")
    .then((users) => res.send(users));
});

app.post("/signin", (req, res) => signIn.handleSignIn(req, res, db, bcrypt));

app.post("/register", (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
);

app.get("/profile/:id", (req, res) => profile.handleProfile(req, res, db));

// curring fct takes argument other fct - similar like above but other approach
app.put("/image", image.handleImage(db));

app.post("/image/url", (req, res) => image.handleAPI(req, res));

app.listen(PORT, () => {
  console.log(`APP is running on port ${PORT}`);
});