import express from "express";
import model from "../Model/restrauntModel.js";

const router = express.Router();

router.get("/:id", getRestraunt, async (req, res) => {
  res.status(200).json(req.restraunt);
});

router.get("/", async (req, res) => {
  try {
    await model.find({}).then((restraunts) => {
      res
        .status(200)
        .json(restraunts)
        .cathc(() => {
          res
            .status(400)
            .json({ message: "There has been an error loading the results" });
        });
    });
  } catch (err) {
    res.status(404).json({ message: "There was an error fetching the data" });
  }
});

router.post("/", (req, res) => {
  const newRestraunt = new model({
    name: req.body.name,
    location: req.body.location,
    capacity: req.body.capacity,
    phone: req.body.phone,
    email: req.body.email,
  });

  newRestraunt
    .save()
    .then(() => {
      res.status(201).json("User added successfully");
    })
    .catch((err) => {
      res.status(403).json({ message: err });
    });
});

router.delete("/:id", getRestraunt, async (req, res) => {
  try {
    await req.restraunt.remove();
    res.status(500).json({ message: "The user has been deleted successfully" });
  } catch {
    res.status(404).json({ messge: "The user has not been deleted" });
  }
});

router.patch("/:id", getRestraunt, async (req, res) => {
  if (req.body.name != null) {
    req.restraunt.name = req.body.name;
  };
  if (req.body.location != null) {
    req.restraunt.location = req.body.location;
  };
  if (req.body.capacity != null) {
    req.restraunt.capacity = req.body.capacity;
  };
  if (req.body.phone != null) {
    req.restraunt.phone = req.body.phone;
  };
  if (req.body.email != null) {
    req.restraunt.email = req.body.email;
  };
  try {
    const updateUser = await req.restraunt.save();
    res.json(updateUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

async function getRestraunt(req, res, next) {
  let restraunt;

  try {
    restraunt = await model.findById(req.params.id);
    if (restraunt == null) {
      res.status(404).json({ message: "The restraunt does not exist" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "There has been an error loading the results" });
  }
  req.restraunt = restraunt;
  next();
}

export default router;
