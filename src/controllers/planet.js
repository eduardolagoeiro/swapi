const Planet = require('../models/planet');

function validate(data){
  let res = validateIsRequired(data, 'name');
  if(res) return res;
  res = validateIsString(data, 'name');
  if(res) return res;
  res = validateIsRequired(data, 'climate');
  if(res) return res;
  res = validateIsString(data, 'climate');
  if(res) return res;
  res = validateIsRequired(data, 'terrain');
  if(res) return res;
  res = validateIsString(data, 'terrain');
  if(res) return res;
  return;
}

function validateIsString(data, attribute){
  if(typeof data[attribute] != 'string'){
    return attribute+' should be a string';
  }
}

function validateIsRequired(data, attribute){
  if(!data[attribute]){
    return attribute+' is required';
  }
}

async function add(data){
  const planet = new Planet(data);
  return planet.save();
}

async function find(options = {}){
  if(options.name) options = {name: options.name};
  else options = {};
  return Planet.find(options).select('-__v');
}

async function findById(id){
  return Planet.findById(id, ).select('-__v');
}

async function removeById(id){
  return Planet.findByIdAndDelete(id);
}

module.exports = {
  removeById,
  add,
  find,
  findById,
  validate
}