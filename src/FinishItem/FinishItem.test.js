import React from 'react';
import ReactDOM from 'react-dom';
import FinishItem from './FinishItem';
import { BrowserRouter } from 'react-router-dom';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(

        <FinishItem />
    , div)
  ReactDOM.unmountComponentAtNode(div)
});