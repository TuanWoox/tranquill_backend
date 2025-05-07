const database = require("./singletonDatabase");
const databaseInstance = database.getInstance();

const connectDB = async () => {
  try {
    await databaseInstance.connect();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
