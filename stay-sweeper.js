const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Stay = require('./db/models/stays');

let today = new Date();

const sweepStays = (() => {
  Stay.find({}).where('endDate').lt(today).exec().then((stays) => {
    stays.forEach((stay) => {
      if (stay.status === 'pending') {
        stay.update({'status': 'rejected'}).exec();
      } else if (stay.status === 'approved') {
        stay.update({'status': 'complete'}).exec();
      }
    });
  }).catch((err) =>{
    console.log(err);
  });
  console.log('sweeping!');
});

sweepStays();
