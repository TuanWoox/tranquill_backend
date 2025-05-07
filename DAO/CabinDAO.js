const Cabin = require("../models/cabin");

class CabinDAO {
  async getAllCabins() {
    try {
      const cabins = Cabin.find({});
      return cabins;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new CabinDAO();
