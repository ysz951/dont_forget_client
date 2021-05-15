import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../services/token-service';

export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={componentProps => {
        return (
          TokenService.hasAuthToken()
          ? <Component {...componentProps} {...props} 
              key={Object.values(componentProps.match.params)[0] + props.select}
            />
          : <Redirect
              to={{
                pathname: '/login',
                state: { from: componentProps.location }
              }}
            />
        )
      }}
    />
  );
};
