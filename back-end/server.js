const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
const restaurantRoutes = require("./routes/restaurant.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/user", userRoutes);
// app.use("/api/restaurant", restaurantRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
