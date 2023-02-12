const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const restaurantRoutes = require("./routes/restaurant.routes");
const planningRoutes = require("./routes/planning.routes");
const reservationRoutes = require("./routes/reservation.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: [
    "sessionId",
    "Content-Type",
    "origin",
    "X-Requested-With",
    "Accept",
    "Access-Control-Allow-Origin",
  ],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res
    .status(200)
    .send({ _id: res.locals.user._id, role: res.locals.user.role });
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/planning", planningRoutes);
app.use("/api/reservation", reservationRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

module.exports = app;
