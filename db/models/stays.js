var mongoose = require('mongoose');
// var sitnpaws = require('../config'); // don't think this is needed...

var staySchema = new mongoose.Schema(
  {
    listing: { type: mongoose.Schema.ObjectId, required: true },
    hostId: { type: mongoose.Schema.ObjectId, required: true },
    guestId: { type: mongoose.Schema.ObjectId, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, required: true },
    listingRating: Number,
    guestRating: Number,
    pricePer: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
  }
);
//TODO: formalize the ref to listing table
var Stay = mongoose.model('Stay', staySchema);

module.exports = Stay;
