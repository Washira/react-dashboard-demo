import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/AddOutlined';
import {
  Grid,
  Typography,
  Button,
  // Dialog,
  // DialogTitle,
  // DialogContent,
  // DialogContentText,
  // TextField,
  // DialogActions
} from '@material-ui/core';
import CreateDialog from './Create';

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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              // onClick={onClickButton}
              onClick={handleClickOpen}
            >
              {buttonName}
            </Button>
          )}
          <CreateDialog handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} />
          {/* <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To add member, please enter any name here.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog> */}
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
