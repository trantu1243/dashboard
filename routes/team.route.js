const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const { teamController } = require('../controllers');
const Team = require('../models/team');

router.get('/', authMiddleware, teamController.getTeams);

router.get('/add', authMiddleware, function(req, res, next) {
    res.render('team/add', {error: null, success: null});
});

router.get('/edit/:id', authMiddleware, async function(req, res, next){
    const team = await Team.findById(req.params.id);
    res.render('team/edit', { team, error: null, success: null });
});

router.post('/add', authMiddleware, teamController.createTeam);

router.post('/edit/:id', authMiddleware, teamController.generateToken)

router.post('/delete/:id', authMiddleware, teamController.deleteTeam)
  
module.exports = router;