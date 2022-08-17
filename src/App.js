import React, { useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { AppContext } from './contexts/AppStore';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import { SnackbarProvider } from 'notistack';
// import RouteLayout from './components/RouteLayout'
import RequireAuth from './components/RequireAuth';
// import BlankLayout from './layouts/BlankLayout';
import SecureLayout from './layouts/SecureLayout';
// import Test from './modules/Test/pages/Test';
import LoginPage from './pages/login';
import Unauthorized from './pages/unauthorized';
import Map from './modules/Maps';
import Members from './modules/Members';
import Profile from './modules/profile';
import PersistLogin from './components/PersistLogin';
import Layout from './components/Layout';
import useAuth from './hooks/useAuth';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150,
};

function App({ locale }) {
  const { i18n } = useTranslation();
  const { persist, setPersist } = useAuth();

  const togglePersist = () => {
    setPersist(!persist);
    // setPersist(false);
  }

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist])

  // Side effect of props.locale changes
  useEffect(() => {
    if (locale) i18n.changeLanguage(locale);
  }, [i18n, locale]);

  return (
    <div>
<Routes>
<Route path="/" element={<Layout />}>
      {/* <Routes element={<BlankLayout />}> */}
        <Route path="login" element={<LoginPage togglePersist={togglePersist}/>}/>
        <Route path="unauthorized" element={<Unauthorized />} />
      {/* </Routes> */}

      {/* <SnackbarProvider> */}
        {/* <Routes> */}
          <Route element={<PersistLogin />}>
            <Route element={<SecureLayout/>}>
              {/* <Route path="/test" element={<Test />} /> */}
              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route path="/" element={<Profile />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Editor, ROLES.Admin]} />}>
                <Route path="map" element={<Map />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              
              {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route path="/profile" element={<Profile />} />
              </Route> */}

              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="member" element={<Members />} />
                <Route path="member/create" element={<Members />} />
                <Route path="member/edit" element={<Members />} />
              </Route>

            </Route>
          </Route>
        {/* </Routes> */}
      {/* </SnackbarProvider> */}
      </Route>
      </Routes>
    </div>
  );
}

export default App;
