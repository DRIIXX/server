# TODO List for EcoTech API Project

## Nivel 5: Initial Setup and GET /list
- [x] Initialize npm project (npm init)
- [x] Install dependencies (express, body-parser)
- [x] Create server.js (main entry point)
- [x] Create src/models/technologies.js (hard-coded data for 10 technologies)
- [x] Create src/services/technologiesService.js (service with DTO)
- [x] Create src/dtos/TechnologyDTO.js
- [x] Create src/controllers/technologiesController.js
- [x] Create src/routes/technologiesRoutes.js (GET /list)
- [x] Create src/routes/index.js
- [x] Update package.json scripts
- [x] Create README.md
- [x] Create .gitignore
- [x] Initialize git and initial commit
- [x] Create Postman collection (postman_collection.json)

## Nivel 6: GET /details/{id}
- [x] Update technologiesController.js (add details endpoint)
- [x] Update technologiesRoutes.js (add /details/{id})

## Add CRUD for Technologies (Admin Routes)
- [ ] Update src/models/technologies.js (add addTechnology, updateTechnology, deleteTechnology)
- [ ] Update src/services/technologiesService.js (add create, update, delete methods)
- [ ] Update src/controllers/technologiesController.js (add create, update, delete handlers)
- [ ] Update src/routes/technologiesRoutes.js (add POST /admin/add, PUT /admin/edit/:id, DELETE /admin/delete/:id)
- [ ] Update postman_collection.json (add requests for CRUD)
- [ ] Update README.md (document new endpoints)
- [ ] Update TODO.md (mark complete)

## Nivel 7: Modularization
- [ ] Create src/models/articles.js and categories.js
- [ ] Create services, DTOs, controllers, routes for articles and categories
- [ ] Update routes/index.js for modular paths (e.g., /technologies, /articles)

## Nivel 8: /search with query params
- [x] Update services for search logic (filter by name, category, etc.)
- [x] Update controllers and routes for /search endpoints

## Nivel 9: Admin/Public Separation
- [ ] Create src/middlewares/authMiddleware.js and roleMiddleware.js
- [ ] Add admin routes (e.g., /admin/edit/{id})
- [ ] Separate public and admin access

## Nivel 10: Role Middleware
- [ ] Enhance middlewares for Admin/User roles
- [ ] Add /reports endpoint for Admin only
- [ ] Final testing and commit
