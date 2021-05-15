import React from 'react';
import ReactDOM from 'react-dom';
import ListNav from './ListNav';
import { BrowserRouter } from 'react-router-dom';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
        <ListNav />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
});
