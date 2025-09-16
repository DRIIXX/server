// Hard-coded data for Technologies entity
let technologies = [
  { id: 1, name: 'Solar Panels', description: 'Photovoltaic panels that convert sunlight into electricity.', category: 'Renewable Energy', efficiency: 20 },
  { id: 2, name: 'Wind Turbines', description: 'Devices that convert wind energy into electrical power.', category: 'Renewable Energy', efficiency: 45 },
  { id: 3, name: 'Electric Vehicles', description: 'Vehicles powered by electric motors instead of internal combustion engines.', category: 'Transportation', efficiency: 90 },
  { id: 4, name: 'Recycling Systems', description: 'Automated systems for sorting and recycling waste materials.', category: 'Waste Management', efficiency: 70 },
  { id: 5, name: 'LED Lighting', description: 'Energy-efficient lighting using light-emitting diodes.', category: 'Energy Efficiency', efficiency: 80 },
  { id: 6, name: 'Hydroponics', description: 'Soil-less farming technique using nutrient-rich water.', category: 'Agriculture', efficiency: 60 },
  { id: 7, name: 'Geothermal Heat Pumps', description: 'Systems that use earth\'s heat for heating and cooling.', category: 'Renewable Energy', efficiency: 300 },
  { id: 8, name: 'Bioplastic Materials', description: 'Plastics derived from renewable biomass sources.', category: 'Materials', efficiency: 50 },
  { id: 9, name: 'Smart Grids', description: 'Advanced electrical grids with monitoring and control.', category: 'Energy Infrastructure', efficiency: 85 },
  { id: 10, name: 'Water Purification Filters', description: 'Filters that remove contaminants from water sources.', category: 'Water Management', efficiency: 95 }
];

// Funcții pentru manipularea datelor
function addTechnology(newTech) {
  const id = Math.max(...technologies.map(t => t.id)) + 1;
  const tech = { id, ...newTech };
  technologies.push(tech);
  return tech;
}

function updateTechnology(id, updatedData) {
  const index = technologies.findIndex(t => t.id === parseInt(id));
  if (index !== -1) {
    technologies[index] = { ...technologies[index], ...updatedData };
    return technologies[index];
  }
  return null;
}

function deleteTechnology(id) {
  const index = technologies.findIndex(t => t.id === parseInt(id));
  if (index !== -1) {
    const deleted = technologies.splice(index, 1)[0];
    return deleted;
  }
  return null;
}

module.exports = { technologies, addTechnology, updateTechnology, deleteTechnology };
