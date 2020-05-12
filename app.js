const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.port || 3000;
const blog = require("./routes/blog");
const news = require("./routes/news");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/", blog);
app.use("/", news);

app.listen(port, () => {
  console.log("Server is running at " + port);
});
