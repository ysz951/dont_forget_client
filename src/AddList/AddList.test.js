import React from 'react';
import ReactDOM from 'react-dom';
import AddList from './AddList';
import { BrowserRouter } from 'react-router-dom';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
        <AddList />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})