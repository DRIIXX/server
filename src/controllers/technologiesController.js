const technologiesService = require('../services/technologiesService');

class TechnologiesController {
  // GET /list - return static list of technologies
  getList(req, res) {
    try {
      const list = technologiesService.getList();
      res.status(200).json(list);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // GET /details/{id} - return technology details or 404
  getDetails(req, res) {
    try {
      const { id } = req.params;
      const tech = technologiesService.getById(id);
      if (tech) {
        res.status(200).json(tech);
      } else {
        res.status(404).json({ error: 'Technology not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // POST /admin/add - add new technology
  create(req, res) {
    try {
      const { name, description, category, efficiency } = req.body;
      if (!name || !description || !category || efficiency === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const newTech = technologiesService.create({ name, description, category, efficiency });
      res.status(201).json(newTech);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // PUT /admin/edit/:id - update existing technology
  update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, category, efficiency } = req.body;
      const updatedTech = technologiesService.update(id, { name, description, category, efficiency });
      if (updatedTech) {
        res.status(200).json(updatedTech);
      } else {
        res.status(404).json({ error: 'Technology not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // DELETE /admin/delete/:id - delete technology
  delete(req, res) {
    try {
      const { id } = req.params;
      const deletedTech = technologiesService.delete(id);
      if (deletedTech) {
        res.status(200).json(deletedTech);
      } else {
        res.status(404).json({ error: 'Technology not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new TechnologiesController();
