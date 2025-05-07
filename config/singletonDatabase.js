// db.js
const mongoose = require("mongoose");
require("dotenv").config();

class Database {
  constructor() {
    if (Database._instance) {
      throw new Error("Use Database.getInstance() instead of new.");
    }
    Database._instance = this;
  }

  async connect() {
    if (!this.connection) {
      try {
        this.connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected.");
      } catch (err) {
        console.error("❌ MongoDB connection failed:", err.message);
        process.exit(1);
      }
    }
    return this.connection;
  }

  static getInstance() {
    if (!Database._instance) {
      Database._instance = new Database();
    }
    return Database._instance;
  }
}

module.exports = Database;
