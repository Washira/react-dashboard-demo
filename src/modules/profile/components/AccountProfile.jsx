// import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  firstName: 'อรรถพล',
  lastName: 'บำรุงราษฎร์',
  email: 'atthapol@gmail.com',
  phone: '0842505592',
  address: '18 หมู่ 9 ต.กร่ำ อ.แกลง จ.ระยอง 21190'
};

const AccountProfile = (props) => (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 200,
            width: 200
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${user.email}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${user.address}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${user.phone}`}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
        disabled
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>
);

export default AccountProfile;