const express = require("express");
const router = express.Router();
const multer = require("multer");
const technologiesController = require("../controllers/technologiesController");
const { validationPipe } = require("../validation/globalValidation");
const CreateTechnologyDto = require("../dtos/create-technology.dto");
const UpdateTechnologyDto = require("../dtos/update-technology.dto");
const SearchTechnologyDto = require("../dtos/search-technology.dto");
const TechnologyIdDto = require("../dtos/technology-id.dto");
const { fileValidationPipe, MAX_SIZE_BYTES, ALLOWED_MIME } = require("../pipes/fileValidationPipe");
const validate = validationPipe;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE_BYTES },
  fileFilter: (req, file, cb) => cb(null, true),
});

const uploadCsv = (req, res, next) =>
  upload.single("file")(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File too large. Max 2MB allowed." });
      }
      return res.status(400).json({ error: "File upload error." });
    }
    return next();
  });

// GET /list - static list of technologies
router.get('/list', (req, res) => technologiesController.getList(req, res));

// GET /search - search technologies by name
router.get(
  "/search",
  validate(SearchTechnologyDto, "query"),
  (req, res) => technologiesController.search(req, res)
);

// GET /details/:id - technology details or 404
router.get(
  "/details/:id",
  validate(TechnologyIdDto, "params"),
  (req, res) => technologiesController.getDetails(req, res)
);

// POST /admin/add - add new technology
router.post(
  "/admin/add",
  validate(CreateTechnologyDto, "body"),
  (req, res) => technologiesController.create(req, res)
);

// PUT /admin/edit/:id - update technology
router.put(
  "/admin/edit/:id",
  validate(TechnologyIdDto, "params"),
  validate(UpdateTechnologyDto, "body"),
  (req, res) => technologiesController.update(req, res)
);

// DELETE /admin/delete/:id - delete technology
router.delete(
  "/admin/delete/:id",
  validate(TechnologyIdDto, "params"),
  (req, res) => technologiesController.delete(req, res)
);

// POST /import - import technologies from CSV
router.post(
  "/import",
  uploadCsv,
  fileValidationPipe,
  (req, res) => technologiesController.import(req, res)
);

// GET /export - export technologies to CSV (optional filter by name)
router.get(
  "/export",
  validate(SearchTechnologyDto, "query"),
  (req, res) => technologiesController.export(req, res)
);

module.exports = router;
