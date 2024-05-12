var express = require("express");
var router = express.Router();
var Plan = require("../models/plans.js");
var Blog = require("../models/blogs.js");

router.post("/getCarousel", async function (req, res, next) {
  switch (req.body.id) {
    case "allPlans":
      try {
        const titles = await Plan.find({ "public": true }).select("-_id");
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
  res.send();
});

module.exports = router;
