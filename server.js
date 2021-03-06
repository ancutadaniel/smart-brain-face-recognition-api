const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const PORT = 3000;
const app = express();

// Database connection
const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Server running");
});

app.post("/signin", (req, res) => signIn.handleSignIn(req, res, db, bcrypt));

app.post("/register", (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
);

app.get("/profile/:id", (req, res) => profile.handleProfile(req, res, db));

// curring fct takes argument other fct - similar like above but other approach
app.put("/image", image.handleImage(db));

app.post("/image/url", (req, res) => image.handleAPI(req, res));

app.listen(process.env.PORT || PORT, () => {
  console.log(`APP is running on port ${process.env.PORT}`);
});
