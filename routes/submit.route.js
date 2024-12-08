const express = require('express');
const { submitController } = require('../controllers');
const router = express.Router();

router.get('/', submitController.viewSubmit);

router.post('/', submitController.submitFlag);
  
module.exports = router;