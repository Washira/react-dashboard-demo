import React, { useState } from 'react';
import { 
  Container,
  Grid, 
  Box, 
  Card, 
  Typography, 
  TextField, 
  Button, 
  TableFooter, 
  TablePagination, 
  InputAdornment, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  IconButton, 
  Avatar,
} from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { makeStyles } from '@material-ui/core/styles';
import PageHeader from '../../../components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { useSnackbar } from 'notistack';
import SearchIcon from '@material-ui/icons/Search';
// import { AppContext } from '../../../../contexts/AppStore';
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


function Contacts(props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // const { hasPermission } = useContext(AppContext);
  const classes = useStyles();
  // const { enqueueSnackbar } = useSnackbar();
  // const [searchContact, setSearchContact] = useState("");
  const [allContacts, set_allContacts] = useState([{name: 'poo'}]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  // const [timeoutBool, setTimeoutBool] = useState(false);
  // const [trigger, setTrigger] = useState(true);
  // const [isSearchES, setIsSearchES] = useState(false);


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


  // function elasticSearchInputData(event, value) {
  //   const searchtext = event.target.value;
  //   setSearchContact(searchtext);
  //   setIsSearchES(searchtext.length > 0);

  //   let keyword = searchContact;
  //   keyword = keyword.replace('.', ' ');
  //   keyword = keyword.replace('.', ' ');
  //   keyword = keyword.replace('-', ' ');
  //   keyword = keyword.replace('-', ' ');

  //   // EDIT a Contact
  //   // Search for Parent <--- find by name, get the _id
  //   // Set Parent in Contact for EDIT <--- Contact.parentId = _id
  //   const input_query = {
  //     query: {
  //       query_string: {
  //         fields: [
  //           // "CustomData.contactType",
  //           "name",
  //           "email", 
  //           "phone"
  //         ],
  //         query: `*${keyword}*`,
  //       }
  //     },
  //   }
  //   // console.log("input_query", JSON.stringify(input_query))

  //   if (event.target.value != null && event.target.value) {
  //     let query = `${process.env.REACT_APP_ELASTIC_SEARCH_FQDN}/elasticsearch/cream/person/_search?pretty`
  //     fetch(query, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(input_query)
  //     })
  //       .then(res => res.json())
  //       .then((data) => {
  //         let converted_list = data.hits.hits.map((v) => {
  //           v._source._id = v._id;
  //           return v._source;
  //         });
  //         // console.log("converted_list", converted_list);
  //         set_allContacts(converted_list);
  //         setPage(0);
  //       })
  //   }
  //   else if (!event.target.value || event.target.value==="") {
  //     return fetchContacts()
  //   }

  //   esGetSearchData(input_query);
  // }

  // const esGetSearchData = (input_query) => {
  //   const query = `${process.env.REACT_APP_ELASTIC_SEARCH_FQDN}/elasticsearch/cream/person/_search?pretty`;

  //   fetch(query, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(input_query)
  //   })
  //     .then(res => res.json())
  //     .then((data) => {
  //       let converted_list = data.hits.hits.map((v) => {
  //         v._source._id = v._id;
  //         return v._source;
  //       });
  //       // console.log("converted_list", converted_list);
  //       set_allContacts(converted_list);
  //       // setPage(0);
  //     });
  // }

  // const fetchContacts = useCallback(() => {
  //   fetch(`${process.env.REACT_APP_CONTACT_BACKEND_FQDN}/api/contacts/Person`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       set_allContacts(data.data)
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     })
  // }, []);

  // useEffect(() => {
  //   console.log("just loaded page perform: fetchContacts");
  //   fetchContacts();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   const refreshContactsTimer = setInterval(() => {
  //     // console.log("refreshContactsTimer: isSearchES =", isSearchES);
  //     if (isSearchES === false) fetchContacts();
  //   }, 60000);
  //   return () => {
  //     clearInterval(refreshContactsTimer);
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSearchES]);

  // const handleDelete = (delete_id) => {
  //   setDeleteOpen(false)
  //   // console.log(delete_id)
  //   let query = `${process.env.REACT_APP_CONTACT_BACKEND_FQDN}/api/contacts/Person/${delete_id}`
  //   var raw = JSON.stringify(delete_id);
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   fetch(query, {
  //     method: 'Delete',
  //     headers: myHeaders,
  //     body: raw,
  //   })
  //     .then(response => {
  //       if (response.status >= 200 && response.status <= 299) {
  //         // navigate.push('/contacts');
  //         setTrigger(!trigger);
  //         enqueueSnackbar(t('Contact has been deleted.'), { variant: 'success' });
  //         // fetch(`${process.env.REACT_APP_CONTACT_BACKEND_FQDN}/api/contacts/Person`)
  //         //   .then((response) => response.json())
  //         //   .then((data) => {
  //         //     // console.log(" all contacts data", data)
  //         //     set_allContacts(data.data)
  //         //   })
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //       enqueueSnackbar(t('Contact has fail to delete.'), { variant: 'error' });

  //     })
  // }

  return (
    <Container maxWidth="xl" className={classes.container}>
      <PageHeader
        title={t('contacts_page_title')}
        subtitle={t('contacts_page_subtitle')}
        // buttonName={hasPermission('contact_create') ? t('contacts_page_new') : null}
        buttonName={'Create'}
        onClickButton={() => navigate.push('/contacts/create')}
      />

      <Card className={classes.findingMargin}>
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
      </Card>

      <Grid item xs={12}>
        <Card className={classes.body_table}>
          <Table>

            {/* Table Head */}
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="body2">{t('contact_person_name')}</Typography></TableCell>
                <TableCell><Typography variant="body2">{t('contact_email')}</Typography></TableCell>
                <TableCell><Typography variant="body2">{t('contact_number')}</Typography></TableCell>
                <TableCell><Typography variant="body2">{t('contact_address')}</Typography></TableCell>
                <TableCell><Typography variant="body2">{t('Action')} </Typography></TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {allContacts && allContacts.slice(
                page * rowsPerPage, page * rowsPerPage + rowsPerPage
                ).map((val) => (
                <React.Fragment key={val._id}>
                  <TableRow >
                    <TableCell>
                      <Box display="flex" flexDirection="row">
                        {/* <Avatar style={{backgroundColor : randomColor()}} alt={val.name} src="/broken-image.jpg" /> */}
                        <Avatar alt={val.name} src="/broken-image.jpg" />
                        <Typography className={classes.ty}>{val.name}</Typography>
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
                        {(val.phone) ? val.phone[0] : "" }
                      </Typography>
                      <Typography variant="subtitle2">
                        {(val.phone) ? val.phone[1] : "" }
                      </Typography>
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
                          onClick={() => navigate.push({
                            pathname: '/contacts/edit',
                            state: { contact_id: val._id }
                          })}>
                          <EditOutlinedIcon />
                        </IconButton>

                      {/* Delete Button */}
                      <IconButton
                        // disabled={!hasPermission('contact_delete')}
                        onClick={() => handleDeleteDialog(val._id)}
                      >
                        <DeleteForeverOutlinedIcon />
                      </IconButton>

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
                  count={allContacts.length}
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
            // TransitionComponent={Transition}
            keepMounted
            onClose={handleDeleteDialogClose}
          >
            <DialogTitle>{t("Are you sure you want to delete the contact?")}</DialogTitle>
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

export default Contacts;
