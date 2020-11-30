const express = require('express');
const router = express.Router();

/** Serve static React content */
router.use(express.static('public'));

export = router;