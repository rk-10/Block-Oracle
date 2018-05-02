var express = require('express');
var router = express.Router();
var IPFScontroller = require('../controller/CTRL_ipfs');
var URLcontroller = require('../controller/CTRL_url');
var Wolframcontroller = require('../controller/CTRL_wolframalpha');

router.post('/url', URLcontroller.url_controller);

router.post('/wolframalpha', Wolframcontroller.WolframAlpha_Controller);

router.post('/ipfs', IPFScontroller.ipfsFile);

module.exports = router;
