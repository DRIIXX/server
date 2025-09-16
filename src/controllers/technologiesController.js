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
}

module.exports = new TechnologiesController();
