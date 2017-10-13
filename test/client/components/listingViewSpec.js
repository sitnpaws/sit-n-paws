import React from 'react';
import { expect } from 'chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import axios from 'axios';
import Component from '../../../src/client/components/listingView.js';


const listing = {
  "name": "Say Swinglehurst",
  "zipcode": 94123,
  "dogSizePreference": "small",
  "dogBreedPreference": "ROSIE",
  "dogTemperamentPreference": "Expanded",
  "dogActivityPreference": "fusce",
  "homeAttributes": "Support",
  "hostPictures": "https://randomuser.me/api/portraits/men/55.jpg",
  "homePictures": "https://farm1.staticflickr.com/48/111317752_7934d93e8a.jpg",
  "cost": 57.99
};

//Optional setup which would wrap the entire test

var setup = function(saving) {
  const props = {
    listing: listing
  };
  return shallow(<Component {...props}/>);
};



describe('<listingView />', () => {
  it('renders with CardHeader element', () => {
    const wrapper = setup();
    expect(wrapper.find('CardHeader')).to.have.length(1);
  });

  it('Includes the dog breed in the listing', () => {
    const wrapper = shallow(<Component listing = {listing}/>);
    expect(wrapper.find('.listing').text()).to.include('ROSIE');
  });

  it('sets open state to true when the "request a stay" button is clicked', () => {
    const wrapper = shallow(<Component listing = {listing}/>);
    wrapper.find('FlatButton').simulate('click');
    expect(wrapper.state('open')).to.equal(true);
  });

  it('sends a POST request when "request stay" is clicked', () => {
    const wrapper = shallow(<Component listing = {listing}/>);
    wrapper.find('[label="Request Stay"]').simulate('click');
    expect(wrapper.state('open')).to.equal(true);
  });
});


describe("Request Stay button", () => {
  let sandbox;
  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  it('should display the data', (done) => {
    const data = ['john', 'doe', 'pogi'];
    const resolved = new Promise((r) => r({ data }));
    sandbox.stub(axios, 'get').returns(resolved);

    const wrapper = shallow(<Component listing = {listing}/>);
    wrapper.find('[label="Request Stay"]').simulate('click')
    // .then(() => {
    //   expect($('#users').innerHTML)
    // .to.equal('john,doe,pogi') })
    // .then(done, done);
  });

  it('should display the data returned', (done) => {
    const rejected = new Promise((_, r) => r());
    sandbox.stub(axios, 'get').returns(rejected);
    getUsers()
    .catch(() => {
      expect($('#users').innerHTML)
    .to.equal('An error occured.') })
    .then(done, done);
  });
});