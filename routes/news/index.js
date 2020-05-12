const router = require("express").Router();
const news = require("./news");

router.get("/news", news);

module.exports = router;
