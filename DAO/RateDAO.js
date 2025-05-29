const { eachDayOfInterval } = require("date-fns");
const Rate = require("../models/rate");
const mongoose = require("mongoose"); // Import mongoose

class RateDAO {
  async getCabinRatingByCabinId(cabinId) {
    try {
      // Convert string ID to ObjectId if needed
      const objectIdCabinId = mongoose.Types.ObjectId.isValid(cabinId)
        ? new mongoose.Types.ObjectId(cabinId)
        : cabinId;

      const [{ averageRating = 0, totalRatings = 0 } = {}] =
        (await Rate.aggregate([
          { $match: { cabinId: objectIdCabinId } }, // Changed from cabin to cabinId
          {
            $group: {
              _id: "$cabinId", // Changed from $cabin to $cabinId
              averageRating: { $avg: "$rating" },
              totalRatings: { $sum: 1 },
            },
          },
        ])) || [{}];

      // Lookup individual ratings + user + booking + dates
      const raw = await Rate.aggregate([
        { $match: { cabinId: objectIdCabinId } }, // Changed from cabin to cabinId
        {
          $lookup: {
            from: "bookings",
            localField: "bookingId", // Changed from booking to bookingId
            foreignField: "_id",
            as: "booking",
          },
        },
        { $unwind: "$booking" },
        {
          $lookup: {
            from: "users",
            localField: "userId", // Changed from user to userId
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $project: {
            rating: 1,
            comment: 1,
            createdAt: 1,
            "booking.startDate": 1,
            "booking.endDate": 1,
            userFullName: "$user.fullName",
          },
        },
      ]);

      // Rest of the method remains the same
      const individualRatings = raw.map((item) => {
        const bookedDates = eachDayOfInterval({
          start: new Date(item.booking.startDate),
          end: new Date(item.booking.endDate),
        });
        return {
          ...item,
          bookedDates,
        };
      });

      const result = {
        cabinId,
        averageRating,
        totalRatings,
        individualRatings,
      };

      return result;
    } catch (error) {
      throw new Error(
        `Error fetching rating for cabin ${cabinId} in DAO: ${error.message}`
      );
    }
  }
  async getRateByBookingId(bookingId) {
    try {
      const bookingObjectId = new mongoose.Types.ObjectId(bookingId);
      const rate = await Rate.findOne({ bookingId: bookingObjectId });

      return rate;
    } catch (error) {
      throw new Error(`Error get Rate data in DAO: ${error.message}`);
    }
  }
  async save(rateData) {
    try {
      const rate = new Rate(rateData);
      return await rate.save();
    } catch (error) {
      throw new Error(`Error creating rate in DAO: ${error.message}`);
    }
  }
  async updateRateById(rateId, updateData) {
    try {
      const rateObjectId = new mongoose.Types.ObjectId(rateId);
      const updatedRate = await Rate.findByIdAndUpdate(
        rateObjectId,
        updateData,
        { new: true }
      );
      return updatedRate;
    } catch (error) {
      throw new Error(`Error updating rate in DAO: ${error.message}`);
    }
  }

  async deleteRateById(rateId) {
    try {
      const rateObjectId = new mongoose.Types.ObjectId(rateId);
      const deletedRate = await Rate.findByIdAndDelete(rateObjectId);
      return deletedRate;
    } catch (error) {
      throw new Error(`Error deleting rate in DAO: ${error.message}`);
    }
  }
}

const instance = new RateDAO();
Object.freeze(instance);
module.exports = instance;
