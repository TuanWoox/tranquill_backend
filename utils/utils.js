const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;
module.exports.generateAccessToken = function (user) {
  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return token;
};
module.exports.deleteOldImage = (filename) => {
  try {
    if (filename) {
      const imagePath = path.join(
        __dirname,
        "../public/uploads/cabins",
        filename
      ); // Adjust path as needed
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
  } catch (error) {
    console.error("Error deleting old image:", error);
  }
};
module.exports.duplicateImage = async (originalImageFilename) => {
  if (!originalImageFilename) return "";

  const uploadsDir = path.join(__dirname, "../public/uploads/cabins");
  const ext = path.extname(originalImageFilename);
  const newImageFilename = `copy-${Date.now()}${ext}`;

  const sourcePath = path.join(uploadsDir, originalImageFilename);
  const destPath = path.join(uploadsDir, newImageFilename);

  try {
    // Check if source file exists before copying
    await fsPromises.access(sourcePath);

    // Copy the file asynchronously
    await fsPromises.copyFile(sourcePath, destPath);

    return newImageFilename;
  } catch (error) {
    console.error("Error duplicating image:", error);
    return "";
  }
};
