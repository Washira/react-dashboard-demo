import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';

/*
18 หมู่ 9 ต.กร่ำ อ.แกลง จ.ระยอง 21190
นายอรรถพล บำรุงราษฎร์ 
0842505592
 */

const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    firstName: 'อรรถพล',
    lastName: 'บำรุงราษฎร์',
    email: 'atthapol@gmail.com',
    phone: '0842505592',
    address: '18 หมู่ 9 ต.กร่ำ อ.แกลง จ.ระยอง 21190'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            {/* First Name */}
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText={values.firstName ? null : "Please specify the first name"}
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
                disabled
              />
            </Grid>

            {/* Last Name */}
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
                disabled
              />
            </Grid>

            {/* Email */}
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                // required
                value={values.email}
                variant="outlined"
                disabled
              />
            </Grid>

            {/* Phone */}
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
                disabled
              />
            </Grid>

            {/* Address */}
            <Grid
              item
              // md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Address"
                name="address"
                onChange={handleChange}
                required
                value={values.address}
                variant="outlined"
                disabled
              />
            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            disabled
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;