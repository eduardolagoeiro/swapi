const app = require('./src/app');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, err => {
  if(!err){
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
    });
  }
});
