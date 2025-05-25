const { eachDayOfInterval } = require("date-fns");
const Rate = require("../models/rate");

class RateDAO {
  async getCabinRatingByCabinId(cabinId) {
    try {
      const [{ averageRating = 0, totalRatings = 0 } = {}] =
        await Rate.aggregate([
          { $match: { cabin: cabinId } },
          {
            $group: {
              _id: "$cabin",
              averageRating: { $avg: "$rating" },
              totalRatings: { $sum: 1 },
            },
          },
        ]);

      // 2️⃣ Lookup individual ratings + user + booking + dates
      const raw = await Rate.aggregate([
        { $match: { cabin: cabinId } },
        {
          $lookup: {
            from: "bookings",
            localField: "booking",
            foreignField: "_id",
            as: "booking",
          },
        },
        { $unwind: "$booking" },
        {
          $lookup: {
            from: "users",
            localField: "user",
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

      // 3️⃣ Merge in bookedDates and the cabin‐wide stats
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

  async save(rateData) {
    try {
      const rate = new Rate(rateData);
      return await rate.save();
    } catch (error) {
      throw new Error(`Error creating rate in DAO: ${error.message}`);
    }
  }
}

const instance = new RateDAO();
Object.freeze(instance);
module.exports = instance;
