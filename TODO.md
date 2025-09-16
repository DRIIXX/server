# TODO List for EcoTech API Project

## Nivel 5: Initial Setup and GET /list
- [ ] Initialize npm project (npm init)
- [ ] Install dependencies (express, body-parser)
- [ ] Create server.js (main entry point)
- [ ] Create src/models/technologies.js (hard-coded data for 10 technologies)
- [ ] Create src/services/technologiesService.js (service with DTO)
- [ ] Create src/dtos/TechnologyDTO.js
- [ ] Create src/controllers/technologiesController.js
- [ ] Create src/routes/technologiesRoutes.js (GET /list)
- [ ] Create src/routes/index.js
- [ ] Update package.json scripts
- [ ] Create README.md
- [ ] Create .gitignore
- [ ] Create GitHub repo and initial commit
- [ ] Install Postman and create collection (postman_collection.json)

## Nivel 6: GET /details/{id}
- [ ] Update technologiesController.js (add details endpoint)
- [ ] Update technologiesRoutes.js (add /details/{id})

## Nivel 7: Modularization
- [ ] Create src/models/articles.js and categories.js
- [ ] Create services, DTOs, controllers, routes for articles and categories
- [ ] Update routes/index.js for modular paths (e.g., /technologies, /articles)

## Nivel 8: /search with query params
- [ ] Update services for search logic (filter by name, category, etc.)
- [ ] Update controllers and routes for /search endpoints

## Nivel 9: Admin/Public Separation
- [ ] Create src/middlewares/authMiddleware.js and roleMiddleware.js
- [ ] Add admin routes (e.g., /admin/edit/{id})
- [ ] Separate public and admin access

## Nivel 10: Role Middleware
- [ ] Enhance middlewares for Admin/User roles
- [ ] Add /reports endpoint for Admin only
- [ ] Final testing and commit
