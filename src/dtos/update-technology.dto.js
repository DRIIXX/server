const { categories } = require("../models/categories");

const ALLOWED_CATEGORIES = categories.map((c) => c.name);

class UpdateTechnologyDto {
  constructor(payload) {
    Object.assign(this, payload);
  }
}

UpdateTechnologyDto.schema = {
  name: { type: "string", optional: true, minLength: 3, maxLength: 80 },
  description: { type: "string", optional: true, minLength: 15, maxLength: 300 },
  category: { type: "string", optional: true, in: ALLOWED_CATEGORIES },
  efficiency: { type: "number", optional: true, min: 1, max: 300 },
  contactEmail: { type: "email", optional: true },
  maintenanceCost: { type: "number", optional: true, min: 0 },
  isDeprecated: { type: "boolean", optional: true },
  deprecatedReason: {
    type: "string",
    optional: true,
    minLength: 10,
    validateIf: (payload) => payload.isDeprecated === true,
  },
};

module.exports = UpdateTechnologyDto;
