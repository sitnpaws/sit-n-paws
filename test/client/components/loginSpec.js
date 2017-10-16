
import React from 'react';
import {expect} from 'chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import propTypes from 'prop-types';
import Component from '../../../src/client/components/login.js';

configure({ adapter: new Adapter() });

// AJAX testing
import sinon from 'sinon';
import axios from 'axios';
import moxios from 'moxios';



const customTheme = {
  palette: {
  }
};

const muiTheme = getMuiTheme(customTheme);

var wrapComponent = function() {
  const props = {
    history: [],
    handleLogin : function(){}
  };
  //wrapper.setState({status: this.props.stay.status});
  return shallow(
      <Component {...props} />, {
        context: {muiTheme},
        childContextTypes: {muiTheme: propTypes.object}
      }
  );
};


describe('login', () => {
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

  it('renders a register button', () => {
    const wrapper = wrapComponent();
    expect(wrapper.find('[label="Register"]')).to.have.length(1);
  });


});
