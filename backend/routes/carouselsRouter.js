var express = require("express");
var router = express.Router();
var Plan = require("../models/plans.js");
var Blog = require("../models/blogs.js");

router.post("/getCarousel", async function (req, res, next) {
  switch (req.body.id) {
    case "allPlans":
      try {
        console.log("trying");
        const titles = await Plan.find({ "public": true }).select();
        console.log({ titles });
        res.json(titles);
      } catch (error) {
        console.error("Failed to retrieve public plans:", error);
        res.status(500).send("Error fetching public plans");
      }
      break;
    case "blogs":
      try {
        const blogs = await Blog.find({ "published": true });
        res.json(blogs);
      } catch (error) {
        console.error("Failed to retrieve blogs:", error);
        res.status(500).send("Error fetching blogs");
      }
      break;
    default:
      console.log("Unknown request id: " + req.body.id);
      res.send();
  }
});

router.post("/saveCarousel", async function (req, res, next) {
  if (req.body.plan.length === 0) {
    //Create a new plan
    const plan = new Plan({
      title: "",
      owner: req.body.user,
      days: 1,
      public: true,
    });
    plan.save().then((res) => {
      res.send();
    });
  }
  res.send();
});

module.exports = router;
