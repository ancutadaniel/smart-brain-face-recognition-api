const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "YOUR_API_KEY",
});

const handleAPI = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("API fail!"));
};

// curring fct takes argument other fct

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where({ id })
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.status(200).json(entries[0]))
    .catch((err) => res.status(400).json("error getting entries"));
};

module.exports = { handleImage, handleAPI };
