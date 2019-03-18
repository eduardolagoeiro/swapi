const router = require('express').Router()
const {findAll} = require('../models/Planet');

router.get('/', async (req, res) => {
  try{
    const planets = await findAll();
    res.status(200).send(planets);
  }catch(err){
    res.status(500).send(err);
  }
})

module.exports = router;