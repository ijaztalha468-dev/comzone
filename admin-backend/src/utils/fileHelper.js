const fs = require("fs");
const path = require("path");

function deleteUploadedFile(imageUrl) {

  if (!imageUrl || !imageUrl.includes("/uploads/")) {
    return;
  }

  const filename = imageUrl.split("/uploads/")[1];

  if (!filename) {
    return;
  }

  const filePath = path.join(__dirname, "../../uploads", filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("", err.message);
    }
  });

}


module.exports = { deleteUploadedFile };
