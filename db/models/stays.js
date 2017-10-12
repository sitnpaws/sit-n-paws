var mongoose = require('mongoose');
// var sitnpaws = require('../config'); // don't think this is needed...

staySchema = new mongoose.Schema(
  {
    listingId: { type: mongoose.Schema.ObjectId, required: true },
    hostId: { type: mongoose.Schema.ObjectId, required: true },
    guestId: { type: mongoose.Schema.ObjectId, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, required: true },
    hostRating: type: Number,
    guestRating: type: Number,
    pricePer: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
  }
);

var Stay = mongoose.model('Stay', staySchema);

module.exports = Stay;
