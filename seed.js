// seed.js is for seeding the database with mock data to work with in the interface
// this function is invoked near the top of the server.js file and can be easily commented out to stop seeding

// import mongoose, config, and listing schema
const mongoose = require('mongoose');
const Listing = require('./db/models/listing');
const User = require('./db/models/users');

// guest e-mail: sitnpawsio+guest1@gmail.com
// host e-mail: sitnpawsio+host1@gmail.com
// pw: password1

// seed data for listings to populate host listings
const listingsData = [
{"name":"Chris Pfaff","zipcode":94106,"dogSizePreference":"medium","dogBreedPreference":"Corgi","email":"sitnpawsio+host1@gmail.com","dogActivityPreference":"rutrum","homeAttributes":"Great home with lots of space","hostPictures":"https://randomuser.me/api/portraits/women/44.jpg","homePictures":"https://farm7.staticflickr.com/6076/6080657644_19cfe82456.jpg","cost":35},
{"name":"Niels Larson","zipcode":94110,"dogSizePreference":"super extra large","dogBreedPreference":"Chihuahua","email":"sitnpawsio+host1@gmail.com","dogActivityPreference":"dapibus","homeAttributes":"Great home with lots of space","hostPictures":"https://randomuser.me/api/portraits/women/45.jpg","homePictures":"https://farm1.staticflickr.com/68/187943195_05de9fe99b.jpg","cost":55},
{"name":"Thomasina Luscombe","zipcode":94123,"dogSizePreference":"small","dogBreedPreference":"Dachshund","email":"sitnpawsio+host1@gmail.com","dogActivityPreference":"lacus","homeAttributes":"Great home with lots of space","hostPictures":"https://randomuser.me/api/portraits/women/46.jpg","homePictures":"https://farm6.staticflickr.com/5510/14490433662_2745930345.jpg","cost":30},
{"name":"Shelley Philpot","zipcode":94106,"dogSizePreference":"teeny weeny","dogBreedPreference":"German Shepherd","email":"sitnpawsio+host1@gmail.com","dogActivityPreference":"amet","homeAttributes":"Great home with lots of space","hostPictures":"https://randomuser.me/api/portraits/women/47.jpg","homePictures":"https://farm4.staticflickr.com/3062/3046570389_f960000e36.jpg","cost":65}
];

// seed data for user to provide instant login capability
const mockCompleteUser = [
  {
    username: 'mary444',
    password: 'password1',
    email: 'sitnpawsio+host1@gmail.com',
    name: 'Mary Tester',
    phone: '561-123-5155',
    address: '14 Main Street'
  }
];

// function to clean listings from database and seed with above listings and user
const seedListingDB = () => {
  // remove listings from database to start - NOTE THIS REMOVES ALL LISTINGS, SO BE CAREFUL IN PRODUCTION
  Listing.remove({}, (err) => {
    if(err) {
      console.log(err);
    } else {
      // remove mary444 user prior to adding
      User.remove({'username': 'mary444'}, (err) => {
        if(err) {
          console.log(err);
        }
        let reformatUser = JSON.stringify(mockCompleteUser[0]);
        let newUser = new User(JSON.parse(reformatUser));
        const newUserId = newUser._id;
        // add user mary444 to database
        newUser.save((err) => {
          if(err) {
            console.log(err);
          }
        })
        // iterate over mock listings, format, and save each listing into the database
        listingsData.forEach((listing) => {
          // reformat data to strings for parsing before saving
          listing.userId = newUserId;
          let reformatListing = JSON.stringify(listing);
          let newListing = new Listing(JSON.parse(reformatListing));
          newListing.save((err) => {
            if(err) {
              console.log(err);
            }
          })
        })
      })
      console.log('DATABASE SEEDED');
    }
  })
}

seedListingDB();
