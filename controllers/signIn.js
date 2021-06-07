const handleSignIn = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json("Incorect from submision. Please fill all fields");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email) // or where({email})
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("email or password is wrong");
      }
    })
    .catch((err) => res.status(400).json("email or password is wrong"));
};

module.exports = { handleSignIn };
