require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./config/dbconnect");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const cabinRoutes = require("./routes/cabin");
const bookingRoutes = require("./routes/booking");
const settingRoutes = require("./routes/setting");
const otpRoutes = require("./routes/otp");
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.json());

connectDB();
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/cabin", cabinRoutes);
app.use("/booking", bookingRoutes);
app.use("/setting", settingRoutes);
app.use("/otp", otpRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is listening");
});
