const Cabin = require("../models/cabin");

class CabinDAO {
  constructor() {
    // Ensure this constructor is only used once
    if (CabinDAO.instance) {
      return CabinDAO.instance;
    }

    CabinDAO.instance = this;
  }
  async createCabin(cabinInstance) {
    try {
      const newCabin = new Cabin(cabinInstance);
      return await newCabin.save();
    } catch (err) {
      throw err;
    }
  }

  async getAllCabins() {
    try {
      return Cabin.find({});
    } catch (err) {
      throw err;
    }
  }
  async deleteCabinById(id) {
    try {
      return Cabin.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
  async duplicateCabinById(id) {
    try {
      const cabin = await Cabin.findById(id).lean();
      if (!cabin) {
        throw new Error("Cabin not found");
      }
      // Remove _id to let MongoDB assign a new one
      delete cabin._id;
      const newCabin = new Cabin(cabin);
      return await newCabin.save();
    } catch (err) {
      throw err;
    }
  }
}

// Create and freeze the singleton instance
const instance = new CabinDAO();
Object.freeze(instance);

// Export the singleton instance
module.exports = instance;
