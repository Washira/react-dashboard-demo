/* eslint-disable eqeqeq */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import BlackTooltip from './BlackTooltip'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import RequireAuth from './RequireAuth';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150,
};

const useStyles = makeStyles((theme) => ({
  list: {
    [theme.breakpoints.down('sm')]: {
      padding: 6,
    },
    [theme.breakpoints.up('sm')]: {
      padding: 12,
    },
  },
  listItem: {
    padding: 8,
    borderRadius: 6,
  },
  listItemIcon: {
    marginLeft: 4,
  },
}))

const NavigationsMenu = () => {
  const classes = useStyles()
  const { t } = useTranslation();
  const currentPath = window.location.pathname;

  return (
    <React.Fragment>
      <List className={classes.list}>

        <ListItem
          button
          className={classes.listItem}
          component={Link}
          to="/profile"
          selected={currentPath === '/profile'}
        >
          <ListItemIcon>
            <BlackTooltip title={t('Profile')}  placement="right">
              <PersonOutlineIcon className={classes.listItemIcon}/>
            </BlackTooltip>
          </ListItemIcon>
          <ListItemText primary={t('Profile')} />
        </ListItem>

        {/* Map */}
        <ListItem
          className={classes.listItem}
          button
          component={Link}
          to="/map"
          selected={currentPath === '/map'}
        >
          <ListItemIcon>
            <BlackTooltip title={t('Map')} placement="right">
              <ExploreOutlinedIcon className={classes.listItemIcon} />
            </BlackTooltip>
          </ListItemIcon>
          <ListItemText primary={t('Map')} />
        </ListItem>

        {/* Members */}
        {<RequireAuth allowedRoles={[ROLES.Admin]} /> && (
          <ListItem
            button
            className={classes.listItem}
            component={Link}
            to="/member"
            selected={currentPath === '/member'}
          >
            <ListItemIcon>
              <BlackTooltip title={t('Members')}  placement="right">
                <PeopleOutlineIcon className={classes.listItemIcon}/>
              </BlackTooltip>
            </ListItemIcon>
            <ListItemText primary={t('Members')} />
          </ListItem>
        )}

      </List>
    </React.Fragment>
  )
}

export default NavigationsMenu
