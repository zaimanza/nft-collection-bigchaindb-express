var router = require('express').Router();

// split up route handling
router.use('/metadata', require('./metadata.controller'));
// etc.

module.exports = router;