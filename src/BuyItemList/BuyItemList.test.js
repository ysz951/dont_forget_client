import React from 'react';
import ReactDOM from 'react-dom';
import BuyItemList from './BuyItemList';
import { BrowserRouter } from 'react-router-dom';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
        <BuyItemList />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})