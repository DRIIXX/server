# EcoTech API

API for informational resources about ecological technologies.

## Entities
- Technologies: Ecological technologies (e.g., solar panels).
- Articles: Informational articles.
- Categories: Categories for grouping.

## Setup
1. Install dependencies: `npm install`
2. Run server: `npm start`
3. For development: `npm run dev`

## Endpoints (Nivel 5-6 + Admin CRUD)
- GET /technologies/list: List all technologies (static list of 10 items)
- GET /technologies/details/{id}: Get details of a specific technology by id (404 if invalid id)
- POST /technologies/admin/add: Add new technology (body: name, description, category, efficiency)
- PUT /technologies/admin/edit/{id}: Update technology by id
- DELETE /technologies/admin/delete/{id}: Delete technology by id

## Testing (Nivel 5-6 + Admin CRUD)
1. Start the server: `npm start`
2. Open Postman and import `postman_collection.json`
3. Run the "Get Technologies List" request (GET http://localhost:3000/technologies/list)
   - Verify response: JSON array with 10+ technology objects (id, name, description, category, efficiency)
   - Status: 200 OK
4. Run the "Get Technology Details" request (GET http://localhost:3000/technologies/details/1)
   - Verify response: JSON object for technology with id=1
   - Status: 200 OK
5. Test invalid id: Change URL to /technologies/details/999
   - Verify response: {"error": "Technology not found"}
   - Status: 404 Not Found
6. Run the "Add New Technology (Admin)" request (POST http://localhost:3000/technologies/admin/add)
   - Body: {"name": "New Eco Tech", "description": "Description here", "category": "Renewable Energy", "efficiency": 85}
   - Verify response: JSON object with new technology (id=11)
   - Status: 201 Created
7. Run the "Update Technology (Admin)" request (PUT http://localhost:3000/technologies/admin/edit/1)
   - Body: {"name": "Updated Tech", "description": "Updated description", "category": "Updated Category", "efficiency": 90}
   - Verify response: JSON object with updated technology
   - Status: 200 OK
8. Run the "Delete Technology (Admin)" request (DELETE http://localhost:3000/technologies/admin/delete/11)
   - Verify response: JSON object of deleted technology
   - Status: 200 OK
9. Test invalid operations: Try updating/deleting non-existent id
   - Status: 404 Not Found
