const router = require('express').Router()
const {findAll, findById} = require('../models/Planet');

router.get('/', async (req, res) => {
  try{
    const planets = await findAll();
    res.status(200).send(planets);
  }catch(err){
    res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const planet = await findById(req.params.id);
    if(!planet) res.status(404).send('resource not found');
    else res.status(200).send(planet);
  }catch(err){
    if(err.name == 'CastError') res.status(404).send('resource not found');
    else res.status(500).send(err);
  }
});

module.exports = router;