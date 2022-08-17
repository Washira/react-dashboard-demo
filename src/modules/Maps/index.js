import React from 'react';
import Map from './pages';
import PageHeader from '../../components/PageHeader';
// import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container,
  Grid,
  Card,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(3),
  },
  cardStatus: {
    padding: '10px 0'
  },
  body_table: {
    maxHeight: '100%',
    overflow: 'auto',
    marginTop: '20px',
    marginBottom: '20px'
  },
  findingMargin: {
    paddingLeft: '14px',
    paddingRight: '14px'
  },
  paginationActions: {
    marginRight: '5%'
  },
  cardIcons: {
    paddingTop: '10px',
    paddingBottom: '10px',
  },
}));


function MapApp() {
  const { t } = useTranslation();
  const classes = useStyles();
  return (

    <Container maxWidth="xl" className={classes.container}>
      <PageHeader
        title={t('Map Page')}
        subtitle={t('The Locations of Buying Places')}
        // buttonName={hasPermission('contact_create') ? t('contacts_page_new') : null}
        // buttonName={'Create'}
        // onClickButton={() => navigate.push('/contacts/create')}
      />

      <Card className={classes.findingMargin}>
        <Grid container spacing={2} className={classes.cardStatus}>
          <Grid item md={3} xs={12}>
            <Typography>สถานะการทำงาน : </Typography>
          </Grid>
        </Grid>
      </Card>

      <Grid item xs={12}>
        <Card className={classes.body_table}>
        <Map />
        </Card>
      </Grid>

      <Card className={classes.findingMargin}>
        <Grid container spacing={2} className={classes.cardIcons}>
          <Grid item md={3} xs={12}>
            <div><img src="/icons/location-pin.png" alt="" style={{height: '25px'}} /> : ดำเนินการวันนี้</div>
          </Grid>
          <Grid item md={3} xs={12}>
            <div><img src="/icons/location.png" alt="" style={{height: '25px'}} /> : รอดำเนินการ</div>
          </Grid>
          <Grid item md={3} xs={12}>
            <div><img src="/icons/ok.png" alt="" style={{height: '25px'}} /> : ดำเนินการแล้ว</div>
          </Grid>
        </Grid>
      </Card>

    </Container>
  )
};

export default MapApp;