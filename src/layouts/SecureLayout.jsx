import React from 'react';
import clsx from 'clsx';
import { AppBar, Divider, Drawer, IconButton, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NavigationsMenu from '../components/NavigationMenus';
import useAuth from '../hooks/useAuth';
import { useLocation, Navigate, Outlet } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#f1f5f9',
    // flexGrow: 1,
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 250,
    width: `calc(100% - ${250}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    marginLeft: '36px',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 250,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 60,
    [theme.breakpoints.up('sm')]: {
      width: 72,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

function SecureLayout({ allowedRoles, showBackButton, children }) {
  const classes = useStyles();
  const { auth } = useAuth();
  const location = useLocation();
  const [drawerExpand, setDrawerExpand] = React.useState(false);

  const handleDrawerExpand = () => {
    setDrawerExpand(true);
  };

  const handleDrawerClose = () => {
    setDrawerExpand(false);
  };

  React.useEffect(() => {
    const test = auth?.roles?.find(role => allowedRoles?.includes(role))
    console.log('Test ', test);
  }, [allowedRoles, auth])

  return (
    // auth?.roles?.find(role => allowedRoles?.includes(role))
    //   ? (
        <div className={classes.root}>
          <AppBar position="absolute" className={clsx(classes.appBar, drawerExpand && classes.appBarShift)}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleDrawerExpand}
                className={clsx(classes.menuButton, drawerExpand && classes.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            open={drawerExpand}
            classes={{
              paper: clsx(classes.drawerPaper, !drawerExpand && classes.drawerPaperClose),
            }}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <NavigationsMenu />
          </Drawer>

          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {/* {children} */}
            <Outlet />
          </main>
        </div>
      // )
      // : auth?.accessToken //changed from user to accessToken to persist login after refresh
      //   ? <Navigate to="/unauthorized" state={{ from: location }} replace />
      //   : <Navigate to="/login" state={{ from: location }} replace />

    
  )
}

export default SecureLayout;