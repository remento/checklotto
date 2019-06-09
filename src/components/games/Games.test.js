import React from 'react';
import ReactDOM from 'react-dom';
import Games from './Game';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Games />, div);
  ReactDOM.unmountComponentAtNode(div);
});