// POST /api/admin/upload - image file leta hai, uska URL wapas deta hai
function uploadImage(req, res) {

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Koi file nahi mili"
    });
  }

  const port = process.env.PORT || 5001;

  // Full URL - taake customer frontend (alag port pe) bhi ise seedha use kar sake
  const fileUrl = `http://localhost:${port}/uploads/${req.file.filename}`;

  return res.status(200).json({
    success: true,
    url: fileUrl
  });

}

module.exports = { uploadImage };
