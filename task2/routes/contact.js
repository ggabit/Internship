const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('contact!!');
});

router.get('/email', (req,res) => {
    res.send('contact through email!');
});

module.exports = router;