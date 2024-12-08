const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const { flagController } = require('../controllers');

router.get('/', authMiddleware, flagController.getFlags);

router.get('/add', authMiddleware, function(req, res, next) {
    res.render('flag/add', {error: null, success: null});
});

router.post('/add', authMiddleware, flagController.createFlag);

router.post('/delete/:id', authMiddleware, flagController.deleteFlag)
  
module.exports = router;