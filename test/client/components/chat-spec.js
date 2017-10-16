require('../../util/jsdom-setup.js');
import React from 'react';
import { expect } from 'chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import Chat from '../../../src/client/components/chat/chat.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
configure({ adapter: new Adapter() });

// AJAX testing
import sinon from 'sinon';
import axios from 'axios';
import moxios from 'moxios';

var wrapComponent = function() {
  const props = {
    match: {params: {stayId: '59e274ea41b7301f67a332e1'}},
    getToken: () => 'abc123',
  };
  return mount(
    <MuiThemeProvider>
      <Chat {...props}/>
    </MuiThemeProvider>
  );
};

describe('<Chat />', () => {
  var axiosGet;

  beforeEach(() => {
    axiosGet = sinon.stub(axios, "get").callsFake(function() {
      return new Promise(function() {});
    });
  });

  afterEach(() => {
    axiosGet.restore();
  });

  it('renders with chat header', () => {
    const wrapper = wrapComponent();
    expect(wrapper.find('.chat-header')).to.have.length(1);
  });

  it('renders with messages container', () => {
    const wrapper = wrapComponent();
    expect(wrapper.find('.messages-container')).to.have.length(1);
  });

  it('renders with new messages container', () => {
    const wrapper = wrapComponent();
    expect(wrapper.find('.new-message-container')).to.have.length(1);
  });

});
