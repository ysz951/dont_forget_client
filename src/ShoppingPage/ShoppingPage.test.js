import React from 'react';
import ReactDOM from 'react-dom';
import ShoppingPage from './ShoppingPage';
import { BrowserRouter } from 'react-router-dom';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
        <ShoppingPage />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
});
