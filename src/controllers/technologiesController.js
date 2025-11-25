const technologiesService = require("../services/technologiesService");

const { validatePayload } = require("../validation/validationPipe");
const CreateTechnologyDto = require("../dtos/create-technology.dto");

const CSV_COLUMNS = [
  "name",
  "description",
  "category",
  "efficiency",
  "contactEmail",
  "maintenanceCost",
  "isDeprecated",
  "deprecatedReason",
];

function toCsvValue(value) {
  if (value === undefined || value === null) return "";
  const stringValue = String(value);
  if (/[" ,\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

class TechnologiesController {
  // GET /list - return static list of technologies
  getList(req, res) {
    try {
      const list = technologiesService.getList();
      res.status(200).json(list);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // GET /search - search technologies by name
  search(req, res) {
    try {
      const { name } = req.query;
      const results = technologiesService.searchByName(name);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // GET /details/{id}
  getDetails(req, res) {
    try {
      const { id } = req.params;
      const tech = technologiesService.getById(id);
      if (tech) {
        res.status(200).json(tech);
      } else {
        res.status(404).json({ error: "Technology not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // POST /admin/add - add new technology
  create(req, res) {
    try {
      const newTech = technologiesService.create(req.body);
      res.status(201).json(newTech);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // PUT /admin/edit/:id - update existing technology
  update(req, res) {
    try {
      const { id } = req.params;
      const updatedTech = technologiesService.update(id, req.body);
      if (updatedTech) {
        res.status(200).json(updatedTech);
      } else {
        res.status(404).json({ error: "Technology not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // DELETE /admin/delete/:id - delete technology
  delete(req, res) {
    try {
      const { id } = req.params;
      const deletedTech = technologiesService.delete(id);
      if (deletedTech) {
        res.status(200).json(deletedTech);
      } else {
        res.status(404).json({ error: "Technology not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // POST /import - import technologies from CSV
  import(req, res) {
    try {
      const file = req.file;
      const content = file.buffer.toString("utf8");
      const lines = content
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      if (!lines.length) {
        return res.status(400).json({ error: "CSV file is empty" });
      }

      const [rawHeader, ...rows] = lines;
      const header = rawHeader.split(",").map((h) => h.trim());

      if (header.length !== CSV_COLUMNS.length) {
        return res.status(400).json({
          error: `Invalid column count. Expected ${CSV_COLUMNS.length} columns.`,
        });
      }

      const normalizedHeader = header.map((h) => h.toLowerCase());
      const expected = CSV_COLUMNS.map((c) => c.toLowerCase());

      const mismatch =
        normalizedHeader.length !== expected.length ||
        normalizedHeader.some((col, idx) => col !== expected[idx]);

      if (mismatch) {
        return res.status(400).json({
          error: `Invalid header. Expected: ${CSV_COLUMNS.join(",")}`,
        });
      }

      const results = {
        totalRows: rows.length,
        imported: 0,
        failed: 0,
        errors: [],
      };

      rows.forEach((row, index) => {
        const values = row.split(",");
        if (values.length !== CSV_COLUMNS.length) {
          results.failed += 1;
          results.errors.push({
            row: index + 2,
            message: `Invalid column count. Expected ${CSV_COLUMNS.length}.`,
          });
          return;
        }

        const payload = {};
        CSV_COLUMNS.forEach((col, colIndex) => {
          const value = values[colIndex] !== undefined ? values[colIndex].trim() : undefined;
          payload[col] = value === "" ? undefined : value;
        });

        const validation = validatePayload(CreateTechnologyDto, payload);
        if (validation.errors) {
          results.failed += 1;
          results.errors.push({
            row: index + 2,
            errors: validation.errors,
          });
          return;
        }

        technologiesService.create(validation.value);
        results.imported += 1;
      });

      return res.status(201).json(results);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // GET /export - export technologies to CSV with optional filters
  export(req, res) {
    try {
      const { name } = req.query;
      const data =
        name && name.length
          ? technologiesService.searchByName(name)
          : technologiesService.getList();

      const header = CSV_COLUMNS.join(",");
      const rows = data.map((item) =>
        CSV_COLUMNS.map((col) => toCsvValue(item[col])).join(",")
      );
      const csv = [header, ...rows].join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=technologies.csv");
      return res.status(200).send(csv);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new TechnologiesController();
