import React from 'react';
import { expect } from 'chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
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

function setup(saving) {
  const props = {
    listing: listing
  };
  return shallow(<Component {...props}/>);
};


/*

after(function () {
  // When the test either fails or passes, restore the original
  // axios ajax function (Sinon.JS also provides tools to help
  // test frameworks automate clean-up like this)
  axios.post.restore();
});

*/

it('makes a POST request to \'/api/stays\'', function () {
  sinon.stub(axios, 'post');

  assert(axios.ajax.calledWithMatch({ url: '/api/stays' }));
});





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
  let server;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    server = sandbox.useFakeServer();
  });
  afterEach(() => {
    server.restore();
    sandbox.restore();
  });
  it("makes a POST request to '/api/stays'", (done) => {
    const wrapper = shallow(<Component listing={listing}/>);
    wrapper.find('[label="Request Stay"]').simulate('click').then(() => {
      setTimeout(() => server.respond([
        200,
        {'Content-Type': 'application/json'},
        '[]']), 0);
    })
  });
});
