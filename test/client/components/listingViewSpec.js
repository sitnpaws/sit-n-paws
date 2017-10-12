




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



describe('<listingView />', () => {
  it('renders as a div', () => {
    const wrapper = shallow(<Component listing = {listing}/>);
    expect(wrapper.find('CardHeader')).to.have.length(1);
  });

  it('Includes the dog breed in the listing', () => {
    const wrapper = shallow(<Component listing = {listing}/>);
    expect(wrapper.find('.listing').text()).to.include('ROSIE');
  });
});


