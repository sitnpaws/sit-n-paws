import React from 'react';
import { expect } from 'chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import Component from '../../../src/client/components/listingView.js';

configure({ adapter: new Adapter() });

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

var wrapComponent = function(saving) {
  const props = {
    listing: listing
  };
  return shallow(<Component {...props}/>);
};

describe('<listingView />', () => {
  it('renders with CardHeader element', () => {
    const wrapper = wrapComponent();
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
});

//todo: loads a get request to listings
//todo Shows listings form the GET request to '/listings'
