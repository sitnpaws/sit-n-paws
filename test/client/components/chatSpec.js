require('../../util/jsdom-setup.js');
import React from 'react';
import { expect } from 'chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import Chat from '../../../src/client/components/chat.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
configure({ adapter: new Adapter() });


var wrapComponent = function() {
  const props = {
    stayId: '59e274ea41b7301f67a332e1'
  };
  return mount(
    <MuiThemeProvider>
      <Chat {...props}/>
    </MuiThemeProvider>
  );
};

describe('<Chat />', () => {
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
