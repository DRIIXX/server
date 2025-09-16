// Data Transfer Object for Technology
class TechnologyDTO {
  constructor(id, name, description, category, efficiency) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.efficiency = efficiency;
  }
}

module.exports = TechnologyDTO;
