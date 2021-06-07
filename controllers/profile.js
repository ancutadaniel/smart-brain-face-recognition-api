const handleProfile = (req, res, db) => {
  const { id } = req.params;

  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        // check to see if user exist default is returning []; Boolean([]) => true
        res.json(user[0]);
      } else {
        res.status(400).json("Not Found");
      }
    })
    .catch((err) => res.status(404).json("error getting user"));
};

module.exports = { handleProfile };
