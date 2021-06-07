const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  // simple validation
  if (!email || !name || !password) {
    return res
      .status(400)
      .json("Incorect from submision. Please fill all fields");
  }
  const hash = bcrypt.hashSync(password);

  db.transaction((trx) => {
    // trx - transaction
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*") // after insert return
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.status(201).json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("Unable to register."));
};

module.exports = { handleRegister };
