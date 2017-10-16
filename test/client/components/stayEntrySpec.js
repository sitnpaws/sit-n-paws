import React from 'react';
import { expect } from 'chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Component from '../../../src/client/components/stayEntry.js';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import propTypes from 'prop-types';

configure({ adapter: new Adapter() });

// AJAX testing
import sinon from 'sinon';
import axios from 'axios';

const listing = {
  _id: "59e10080705f9771fe252800",
  name: "Niels Larson",
  zipcode: 94110
};

const stay = {
      _id: "59e114d6ff7e2871f3285c63",
      endDate: "2017-10-19T07:00:00.000Z",
      guestId: "59e10105ff7e2871f3285c48",
      hostId: "59e10080705f9771fe2527fe",
      listing: listing,
      pricePer: 55,
      role: "guest",
      startDate: "2017-10-16T07:00:00.000Z",
      status: "pending",
      totalPrice: 165
};

const customTheme = {
  palette: {
  }
};

const muiTheme = getMuiTheme(customTheme);

var wrapComponent = function() {
  const props = { stay: stay };
  var wrapper = shallow(
      <Component {...props} />, {
        context: {muiTheme},
        childContextTypes: {muiTheme: propTypes.object}
      }
  );
  wrapper.token = 'testToken';
  return wrapper;
};

describe('<stayEntry />', () => {
  var axiosGet;

  beforeEach(() => {
    axiosGet = sinon.stub(axios, "get").callsFake(function() {
      return new Promise(function() {});
    });
  });

  afterEach(() => {

    axiosGet.restore();
  });

  it('renders as a div', () => {
    const wrapper = wrapComponent();
    expect(wrapper.type()).to.equal('div');
  });

  it('renders with CardHeader element', () => {
    const wrapper = wrapComponent();
    expect(wrapper.find('CardHeader')).to.have.length(1);
  });

  it('renders with CardText element', () => {
    const wrapper = wrapComponent();
    expect(wrapper.find('CardText')).to.have.length(1);
  });

  it('renders with CardActions element', () => {
    const wrapper = wrapComponent();
    expect(wrapper.find('CardActions')).to.have.length(1);
  });

  it('contains a card with actions and a "Cancel Stay" button"', () => {
    const wrapper = wrapComponent();
    expect(wrapper.find('CardActions').find('FlatButton')).to.have.length(2);
    expect(wrapper.find('CardActions').find('[label="Cancel Stay"]')).to.have.length(1);
  });

  it('CardHeader contains name', () => {
    const wrapper = wrapComponent();
    const headerTitle = wrapper.find('CardHeader').props('title');
    expect(JSON.stringify(headerTitle)).to.contain(stay.listing.name);
  });
});

describe('stays entry AJAX', () => {
  var axiosPut;
  var axiosGet;

  beforeEach(() => {
    axiosGet = sinon.stub(axios, "get").callsFake(function() {
      return new Promise(function() {});
    });
    axiosPut = sinon.stub(axios, "put").callsFake(function() {
      return new Promise(function() {});
    });
  });

  afterEach(() => {
    axiosGet.restore();
    axiosPut.restore();
  });

  it('should initiate a PUT request when "Cancel Stay" is clicked', () => {

    const wrapper = wrapComponent();
    wrapper.find('CardActions').find('[label="Cancel Stay"]').simulate('click');
    expect(axiosPut.calledOnce).to.equal(true);

  });
  it('should send a PUT request to "/api/stay/cancel/"', () => {

    const wrapper = wrapComponent();
    wrapper.find('CardActions').find('[label="Cancel Stay"]').simulate('click');

    axiosPut.withArgs('/api/stay/cancel/' + stay._id); // only counts if run with these args;
    var spyCall = axiosPut.getCall(0);
    expect(spyCall.args[0]).to.equal('/api/stay/cancel/' + stay._id);

  });

});

  //todo: make role 'guest', populate with a new stay. Try to cancel.
  //todo: handle put to '/api/stay/cancel/' + this.props.stay._id , headers: {'authorization': this.token}, status: 'cancelled'

  //todo: make role 'host', populate with a new stay. Try to approve.
  //todo: as role: 'host', handle put to '/api/stay/approve/' + this.props.stay._id,, headers: {'authorization': this.token}, status: 'confirmed'

  //todo: make role 'host', populate with a new stay. Try to reject.
  //todo: as role: 'host', handle put to /api/stay/reject/ + stayId, headers: {'authorization': this.token}, status: 'rejected'
