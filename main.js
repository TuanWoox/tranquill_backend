require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const connectDB = require("./config/dbconnect");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const cabinRoutes = require("./routes/cabin");
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.json());

connectDB();
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/cabin", cabinRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is listening");
});
