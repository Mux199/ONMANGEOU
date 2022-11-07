const mongoose = require("mongoose");

mongoose.plugin((schema) => {
  schema.pre("findOneAndUpdate", setRunValidators);
  schema.pre("updateMany", setRunValidators);
  schema.pre("updateOne", setRunValidators);
  schema.pre("update", setRunValidators);
});

function setRunValidators() {
  this.setOptions({ runValidators: true });
}

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@cluster0.4jz2stv.mongodb.net/projet-aos",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));
