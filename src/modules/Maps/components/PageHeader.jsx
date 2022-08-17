import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/AddOutlined';
import { Grid, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0.5rem 0.75rem 1.25rem 0.25rem',
  },
  title: {
    paddingTop: 0,
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(0.75),
    },
  },
  subtitle: {
    marginTop: theme.spacing(0.25),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1.25),
    },
  },
  gridButton: {
    paddingRight: '0px !important',
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '6px',
      padding: '4px 10px',
      fontSize: '0.8125rem',
    },
  },
}));

const PageHeader = ({
  title, subtitle, buttonName, onClickButton,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid alignItems="flex-start" container justifyContent="space-between" spacing={3}>
        <Grid item>
          <Typography className={classes.title} variant="h5">{title}</Typography>
        </Grid>
        <Grid item className={classes.gridButton}>
          {buttonName && (
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={onClickButton}
            >
              {buttonName}
            </Button>
          )}
        </Grid>
      </Grid>
      <Typography variant="body2" className={classes.subtitle}>{subtitle}</Typography>
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  buttonName: PropTypes.string,
  onClickButton: PropTypes.func,
};

PageHeader.defaultProps = {
  buttonName: undefined,
  onClickButton: undefined,
};

export default PageHeader;
