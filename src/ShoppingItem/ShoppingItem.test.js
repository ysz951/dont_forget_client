import React from 'react';
import ReactDOM from 'react-dom';
import ShoppingItem from './ShoppingItem';
import { BrowserRouter } from 'react-router-dom';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
        <ShoppingItem />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
});
