import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteLayout = ({ component, layout, showBackButton, ...rest }) => {
  const Component = component;
  const Layout = layout;

  return (
    <Route
      {...rest}
      // render={(props) => (
        // <Layout showBackButton={showBackButton} {...props}>
        //   <Component {...props} />
        // </Layout>

        // <Layout showBackButton={showBackButton} {...props} element={<Component {...props} />}>
          // {/* <Component {...props} /> */}
        // </Layout>
        
      // )}


    />
  );
};

RouteLayout.propTypes = {
  component: PropTypes.elementType.isRequired,
  layout: PropTypes.elementType.isRequired,
};

export default RouteLayout;
