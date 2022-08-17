import React, { useState, useEffect } from 'react';
import { 
  Container,
  Grid, 
  Box, 
  Card, 
  Typography, 
  // TextField,
  Button, 
  TableFooter, 
  TablePagination, 
  // InputAdornment,
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  IconButton, 
  Avatar,
} from '@material-ui/core';
// import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from '@material-ui/core/styles';
import PageHeader from '../components/PageHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { useSnackbar } from 'notistack';
// import SearchIcon from '@material-ui/icons/Search';
// import { AppContext } from '../../../../contexts/AppStore';
// import useRefreshToken from '../../../hooks/useRefreshToken';
// import axios from '../../../apis/axios';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(3),
  },
  autoCom: {
    margin: "16px 0"
  },
  cellWidth: {
    maxWidth: "30vh",
  },
  ty: {
    margin: "3%",
  },
  body_table: {
    maxHeight: "100%",
    overflow: "auto",
    marginTop: "20px"
  },
  findingMargin: {
    paddingLeft: "14px",
    paddingRight: "14px"
  },
  paginationActions: {
    marginRight: "5%"
  }
}));


function Members(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const classes = useStyles();
  const [member, setMember] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  // const controller = new AbortController();
  const axiosPrivate = useAxiosPrivate();

  const handleDeleteDialog = (deleteId) => {
    setDeleteId(deleteId);
    setDeleteOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // console.log(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal
        })
        console.log(response.data);
        isMounted && setMember(response.data);
      }
      catch (err) {
        console.error(err);
        navigate('/login', { state: {from: location}, replace: true });
      }
    }

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="xl" className={classes.container}>
      <PageHeader
        title={t('Member Page')}
        subtitle={t('show all member of the organization here')}
        // buttonName={hasPermission('contact_create') ? t('contacts_page_new') : null}
        buttonName={'Create'}
        // onClickButton={() => navigate.push('/contacts/create')}
      />

      {/* <Card className={classes.findingMargin}>
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <TextField
              // onChange={(e) => elasticSearchInputData(e)}
              label={t("Search contacts")}
              className={classes.autoCom}
              margin="normal"
              variant="outlined"
              InputProps={{
                type: t('contacts_page_search'), startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </Card> */}

      <Grid item xs={12}>
        <Card className={classes.body_table}>
          <Table>

            {/* Table Head */}
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="body2">{t('Name')}</Typography></TableCell>
                <TableCell><Typography variant="body2">{t('Email')}</Typography></TableCell>
                <TableCell><Typography variant="body2">{t('Phone Number')}</Typography></TableCell>
                <TableCell><Typography variant="body2">{t('Address')}</Typography></TableCell>
                <TableCell><Typography variant="body2">{t('Action')} </Typography></TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {member && member.slice(
                page * rowsPerPage, page * rowsPerPage + rowsPerPage
                ).map((val) => (
                <React.Fragment key={val._id}>
                  <TableRow >
                    <TableCell>
                      <Box display="flex" flexDirection="row">
                        {/* <Avatar style={{backgroundColor : randomColor()}} alt={val.name} src="/broken-image.jpg" /> */}
                        <Avatar alt={val.firstname} src="/broken-image.jpg" />
                        <Typography className={classes.ty}>{val.firstname} {val.lastname}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell className={classes.CW_email}>
                      <Typography variant="subtitle2">
                        {(val.email) ? val.email[0] : ""} 
                      </Typography>
                      <Typography variant="subtitle2">
                        {(val.email) ? val.email[1] : "" }
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {(val.phone) ? val.phone : "" }
                      </Typography>
                      {/* <Typography variant="subtitle2">
                        {(val.phone) ? val.phone[1] : "" }
                      </Typography> */}
                    </TableCell>
                    <TableCell className={classes.cellWidth}>
                      <Typography variant="subtitle2">
                        {val.address}
                      </Typography>
                    </TableCell>

                    <TableCell>

                      {/* Edit Button */}
                        <IconButton
                          // disabled={!hasPermission('contact_edit')}
                          className={classes.link_edit}
                          variant="contained"
                          // onClick={() => navigate.push({
                          //   pathname: '/contacts/edit',
                          //   state: { contact_id: val._id }
                          // })}
                          onClick={() => handleDeleteDialog(val._id)}
                        >
                          <DeleteOutlinedIcon />
                        </IconButton>

                      {/* Delete Button */}
                      {/* <IconButton
                        // disabled={!hasPermission('contact_delete')}
                        onClick={() => handleDeleteDialog(val._id)}
                      >
                        <DeleteForeverOutlinedIcon />
                      </IconButton> */}

                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>

            {/* Table footer (Pagination) */}
            <TableFooter style={{textAlign: "right"}} align='right'>

              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={member.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>

            </TableFooter>
          </Table>

          {/* Delete confirmation dialog */}
          <Dialog
            open={deleteOpen}
            keepMounted
            onClose={handleDeleteDialogClose}
          >
            <DialogTitle>{t("Are you sure you want to delete this contact?")}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t("This will permanently delete the contact.")}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialogClose} color="secondary">
                {t("Cancel")}
              </Button>
              <Button
                // onClick={() => handleDelete(deleteId)}
                color="primary"
              >
                {t("Delete")}
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      </Grid>

    </Container>
  )
}

export default Members;
