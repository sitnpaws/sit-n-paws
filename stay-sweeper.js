const mongoose = require ('mongoose');
const sitnpaws = require('./db/config');
mongoose.Promise = global.Promise;
const Stay = require('./db/models/stays');

let today = new Date();

const sweepStays = () => {
  const expiringStays = Stay.find({}).where('startDate').gt(today).where('status').equals('pending').exec();
  const completeStays = Stay.find({}).where('endDate').gt(today).where('status').equals('approved').exec();

  Promise.all([expiringStays, completeStays]).then(([expiringStays, completeStays]) => {
    expiringStays.forEach(stay => stay.update({'status': 'expired'}).exec());
    completeStays.forEach(stay => stay.update({'status': 'complete'}).exec());
  }).catch((err) =>{
    console.log(err);
  });
  console.log('sweeping!');
};

sweepStays();
