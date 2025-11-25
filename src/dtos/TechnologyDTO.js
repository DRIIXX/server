// Data Transfer Object for Technology
class TechnologyDTO {
  constructor(id, name, description, category, efficiency, contactEmail, maintenanceCost, isDeprecated, deprecatedReason) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.efficiency = efficiency;
    this.contactEmail = contactEmail;
    this.maintenanceCost = maintenanceCost;
    this.isDeprecated = isDeprecated;
    this.deprecatedReason = deprecatedReason;
  }
}

module.exports = TechnologyDTO;
