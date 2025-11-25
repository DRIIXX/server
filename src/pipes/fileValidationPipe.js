const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
const ALLOWED_MIME = ["text/csv", "application/vnd.ms-excel"];

function fileValidationPipe(req, res, next) {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "CSV file is required under field 'file'" });
  }

  if (!ALLOWED_MIME.includes(file.mimetype)) {
    return res.status(400).json({ error: "Invalid file type. Only CSV is allowed." });
  }

  if (file.size > MAX_SIZE_BYTES) {
    return res.status(400).json({ error: "File too large. Max 2MB allowed." });
  }

  return next();
}

module.exports = { fileValidationPipe, MAX_SIZE_BYTES, ALLOWED_MIME };
