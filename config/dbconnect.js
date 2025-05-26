const database = require("./singletonDatabase");

const connectDB = async () => {
  try {
    await database.connect();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
