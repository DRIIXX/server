const { technologies, addTechnology, updateTechnology, deleteTechnology } = require('../models/technologies');
const TechnologyDTO = require('../dtos/TechnologyDTO');

class TechnologiesService {
  // Return list of TechnologyDTOs (static list)
  getList() {
    return technologies.map(
      t => new TechnologyDTO(t.id, t.name, t.description, t.category, t.efficiency)
    );
  }

  // Return TechnologyDTO by id or null if not found
  getById(id) {
    const tech = technologies.find(t => t.id === parseInt(id));
    if (tech) {
      return new TechnologyDTO(tech.id, tech.name, tech.description, tech.category, tech.efficiency);
    }
    return null;
  }

  // Create new technology and return DTO
  create(newTechData) {
    const newTech = addTechnology(newTechData);
    return new TechnologyDTO(newTech.id, newTech.name, newTech.description, newTech.category, newTech.efficiency);
  }

  // Update technology by id and return DTO or null
  update(id, updatedData) {
    const updatedTech = updateTechnology(id, updatedData);
    if (updatedTech) {
      return new TechnologyDTO(updatedTech.id, updatedTech.name, updatedTech.description, updatedTech.category, updatedTech.efficiency);
    }
    return null;
  }

  // Delete technology by id and return DTO or null
  delete(id) {
    const deletedTech = deleteTechnology(id);
    if (deletedTech) {
      return new TechnologyDTO(deletedTech.id, deletedTech.name, deletedTech.description, deletedTech.category, deletedTech.efficiency);
    }
    return null;
  }
}

module.exports = new TechnologiesService();
