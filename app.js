const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const { requireAuth } = require("./middlewares/authMiddleware");

const app = express();

dotenv.config({ path: "./config.env" });

// middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

const dbURI = process.env.DATABASE;
const Port = process.env.PORT || 5000;

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(Port);
    console.log("connected to db and listening at port 5000");
  })
  .catch((err) => {
    console.log(err);
  });

// app.get("/", (req, res) => {
//   res.send("connected to db and listening at port 5000");
// });

app.use(authRoutes);
app.use(eventRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}
