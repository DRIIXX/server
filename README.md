# EcoTech API

API for informational resources about ecological technologies.

## Entities
- Technologies: Ecological technologies (e.g., solar panels).
- Categories: Categories used to validate and group technologies.

## Setup
1. Install dependencies: `npm install`
2. Run server: `npm start`
3. For development: `npm run dev`

## Endpoints
- GET /technologies/list: List all technologies (static list of 10 items, names in uppercase)
- GET /technologies/details/{id}: Get details of a specific technology by id (validated numeric param, 404 if invalid id)
- GET /technologies/search?name=<query>: Search technologies by name (validated query, case-insensitive partial match, returns list, names in uppercase)
- POST /technologies/admin/add: Add new technology (validated body, name stored in uppercase)
- PUT /technologies/admin/edit/{id}: Update technology by id (validated param + body, name updated to uppercase)
- DELETE /technologies/admin/delete/{id}: Delete technology by id (validated param, name in response uppercase)
- POST /technologies/import: Import technologies from CSV (validated file type/size/header and per-row DTO validation)
- GET /technologies/export?name=<query>: Export technologies to CSV (optional name filter, validated query)

## Validation
- Global ValidationPipe config: `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`.
- DTOs: `src/dtos/create-technology.dto.js`, `src/dtos/update-technology.dto.js`, `src/dtos/search-technology.dto.js`, `src/dtos/technology-id.dto.js`.
- Required body fields when creating: `name` (3-80 chars), `description` (15-300 chars), `category` (must be in Categories), `efficiency` (1-300 number), `contactEmail` (valid email). Optional: `maintenanceCost` (>=0), `isDeprecated` (boolean), `deprecatedReason` (min 10 chars if `isDeprecated` is true).
- Params and queries are validated too: `id` must be a positive number; `name` query must be at least 2 characters (optional).

### Quick validation scenarios (curl)
- Valid: `curl -X POST http://localhost:3000/technologies/admin/add -H "Content-Type: application/json" -d "{\"name\":\"Battery Storage\",\"description\":\"Grid scale battery units for peak shifting\",\"category\":\"Energy Infrastructure\",\"efficiency\":88,\"contactEmail\":\"ops@storage.example.com\"}"`
- Invalid (missing/whitelist): same call but add extra field `foo: "bar"` or leave out `contactEmail` → `400` with error details.
- Conditional: include `"isDeprecated": true` but omit `"deprecatedReason"` → `400`; add `"deprecatedReason": "Superseded by new generation"` to pass.

### CSV import/export scenarios
- Import valid CSV (headers must match exactly): `name,description,category,efficiency,contactEmail,maintenanceCost,isDeprecated,deprecatedReason`
- Import invalid CSV: mix 3 good rows + 2 bad rows (wrong column count or bad data) → response shows imported/failed counts and row errors.
- File validation: upload `.txt` instead of `.csv` → `400`; upload file > 2MB → `400`.
- Export CSV: `curl -o technologies.csv "http://localhost:3000/technologies/export"` or with filter `?name=wind`.

## Testing (Nivel 5-6 + Admin CRUD + CSV)
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
   - Body: {"name": "New Eco Tech", "description": "Description here", "category": "Renewable Energy", "efficiency": 85, "contactEmail": "admin@eco.example.com"}
   - Verify response: JSON object with new technology (id=11)
   - Status: 201 Created
7. Run the "Update Technology (Admin)" request (PUT http://localhost:3000/technologies/admin/edit/1)
   - Body: {"name": "Updated Tech", "description": "Updated description", "category": "Renewable Energy", "efficiency": 90}
   - Verify response: JSON object with updated technology
   - Status: 200 OK
8. Run the "Delete Technology (Admin)" request (DELETE http://localhost:3000/technologies/admin/delete/11)
   - Verify response: JSON object of deleted technology
   - Status: 200 OK
9. CSV import: POST /technologies/import with form-data key `file` pointing to a valid `.csv`
   - Verify response JSON shows imported/failed counts
   - Status: 201 Created (even if some rows fail, the status remains 201)
10. CSV export: GET /technologies/export (optionally `?name=<filter>`)
   - Verify download named `technologies.csv`
   - Status: 200 OK
11. Test invalid operations: Try updating/deleting non-existent id
   - Status: 404 Not Found
