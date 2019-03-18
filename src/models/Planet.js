const mongoose = require('mongoose');

const Planet = mongoose.model('Planet', {
  name: String,
  clime: String,
  terrain: String
});

function validate(data){
  let res = validateIsRequired(data, 'name');
  if(res) return res;
  res = validateIsString(data, 'name');
  if(res) return res;
  res = validateIsRequired(data, 'clime');
  if(res) return res;
  res = validateIsString(data, 'clime');
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
  const validateResult = validate(data);
  if(validateResult) throw new Error(validateResult);
  const planet = new Planet(data);
  return await planet.save();
}

module.exports = {
  add,
  validate
}

