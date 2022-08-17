import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

const BlankLayout = ({ children }) => (
  <div>
    {/* {children} */}
    <Outlet />
  </div>
);

BlankLayout.propTypes = {
  children: PropTypes.node,
};

BlankLayout.defaultProps = {
  children: undefined,
};

export default BlankLayout;
