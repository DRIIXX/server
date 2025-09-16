const technologies = require('../models/technologies');
const TechnologyDTO = require('../dtos/TechnologyDTO');

class TechnologiesService {
  // Return list of TechnologyDTOs (static list)
  getList() {
    return technologies.map(
      t => new TechnologyDTO(t.id, t.name, t.description, t.category, t.efficiency)
    );
  }
}

module.exports = new TechnologiesService();
