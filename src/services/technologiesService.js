const {
  technologies,
  addTechnology,
  updateTechnology,
  deleteTechnology,
} = require("../models/technologies");
const TechnologyDTO = require("../dtos/TechnologyDTO");
const nameToUpperPipe = require("../pipes/nameToUpperPipe");

class TechnologiesService {
  // Return list of TechnologyDTOs (static list)
  getList() {
    return technologies.map(
      (t) =>
        new TechnologyDTO(
          t.id,
          nameToUpperPipe(t.name),
          t.description,
          t.category,
          t.efficiency,
          t.contactEmail,
          t.maintenanceCost,
          t.isDeprecated,
          t.deprecatedReason
        )
    );
  }

  // Search technologies by name (case-insensitive partial match)
  searchByName(nameQuery) {
    if (!nameQuery) {
      return [];
    }
    const lowerQuery = nameQuery.toLowerCase();
    const filtered = technologies.filter((t) =>
      t.name.toLowerCase().includes(lowerQuery)
    );
    return filtered.map(
      (t) =>
        new TechnologyDTO(
          t.id,
          nameToUpperPipe(t.name),
          t.description,
          t.category,
          t.efficiency,
          t.contactEmail,
          t.maintenanceCost,
          t.isDeprecated,
          t.deprecatedReason
        )
    );
  }

  // Return TechnologyDTO by id or null if not found
  getById(id) {
    const tech = technologies.find((t) => t.id === parseInt(id, 10));
    if (tech) {
      return new TechnologyDTO(
        tech.id,
        nameToUpperPipe(tech.name),
        tech.description,
        tech.category,
        tech.efficiency,
        tech.contactEmail,
        tech.maintenanceCost,
        tech.isDeprecated,
        tech.deprecatedReason
      );
    }
    return null;
  }

  // Create new technology and return DTO
  create(newTechData) {
    const payload =
      newTechData && newTechData.isDeprecated === false
        ? { ...newTechData, deprecatedReason: null }
        : newTechData;
    const newTech = addTechnology(payload);
    return new TechnologyDTO(
      newTech.id,
      nameToUpperPipe(newTech.name),
      newTech.description,
      newTech.category,
      newTech.efficiency,
      newTech.contactEmail,
      newTech.maintenanceCost,
      newTech.isDeprecated,
      newTech.deprecatedReason
    );
  }

  // Update technology by id and return DTO or null
  update(id, updatedData) {
    const normalizedData =
      updatedData && updatedData.isDeprecated === false
        ? { ...updatedData, deprecatedReason: null }
        : updatedData;
    const updatedTech = updateTechnology(id, normalizedData);
    if (updatedTech) {
      return new TechnologyDTO(
        updatedTech.id,
        nameToUpperPipe(updatedTech.name),
        updatedTech.description,
        updatedTech.category,
        updatedTech.efficiency,
        updatedTech.contactEmail,
        updatedTech.maintenanceCost,
        updatedTech.isDeprecated,
        updatedTech.deprecatedReason
      );
    }
    return null;
  }

  // Delete technology by id and return DTO or null
  delete(id) {
    const deletedTech = deleteTechnology(id);
    if (deletedTech) {
      return new TechnologyDTO(
        deletedTech.id,
        nameToUpperPipe(deletedTech.name),
        deletedTech.description,
        deletedTech.category,
        deletedTech.efficiency,
        deletedTech.contactEmail,
        deletedTech.maintenanceCost,
        deletedTech.isDeprecated,
        deletedTech.deprecatedReason
      );
    }
    return null;
  }
}

module.exports = new TechnologiesService();
