const Cabin = require("../models/cabin");

class CabinDAO {
  constructor() {
    // Ensure this constructor is only used once
    if (CabinDAO.instance) {
      return CabinDAO.instance;
    }

    CabinDAO.instance = this;
  }

  async getAllCabins() {
    try {
      const cabins = Cabin.find({});
      return cabins;
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
