import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import routes from './routes';

const propTypes = {
  history: PropTypes.object.isRequired,
};

const Router = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Suspense fallback={<div>Loading……</div>}>
        {routes.map((routeProps, index) => {
          return <Route key={index} {...routeProps} />;
        })}
      </Suspense>
    </Switch>
  </ConnectedRouter>
);

Router.propTypes = propTypes;
export default Router;
