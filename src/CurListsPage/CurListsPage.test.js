import React from 'react';
import ReactDOM from 'react-dom';
import CurListsPage from './CurListsPage';
import { BrowserRouter } from 'react-router-dom';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
        <CurListsPage />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
});