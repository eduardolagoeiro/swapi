const router = require('express').Router()
const {find, findById, add, validate} = require('../controllers/planet');

router.get('/', async (req, res) => {
  try{
    const planets = await find({name: req.query.name});
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


router.post('/', async (req, res) => {
  try {
    const validateResult = validate(req.body);
    if(validateResult) return res.status(422).send(validateResult);
    const planet = await add(req.body);
    res.status(200).send(planet);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;