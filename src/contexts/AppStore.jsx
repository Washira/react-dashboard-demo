import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

const AppContext = React.createContext();

const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(undefined);

  const hasPermission = (verifyName) => {
    if (!verifyName) return false;
    if (!loginUser) return false;
    if (!loginUser.role) return false;
    if (!loginUser.role.permissions) return false;
    if (!loginUser.role.permissions.length) return false;
    const foundIndex = loginUser.role.permissions.findIndex((p) => {
      return p.name === verifyName;
    })
    return foundIndex !== -1;
  };

  const store = {
    loginUser,
    setLoginUser,
    hasPermission,
  };

  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

AppProvider.defaultProps = {
  children: undefined,
};

export {
  AppContext,
  AppProvider,
  useAppContext,
};
