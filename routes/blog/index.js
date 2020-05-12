const router = require("express").Router();
const blog = require("./blog");

router.get("/blog", blog);

module.exports = router;
