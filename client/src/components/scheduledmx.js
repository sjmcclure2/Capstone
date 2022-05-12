import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Container } from '@mui/material';
import Divider from '@mui/material/Divider';

const style = {
  width: 'auto',
  bgcolor: 'background.paper',
};

export default function ScheduledMx() {
  return (
    <Container>
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button>
      <ListItemText primary="Tail Number" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="Tail Number" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Tail Number" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary="Tail Number" />
      </ListItem>
    </List>
    </Container>
  );
}

//This is a form for the scheduled mx
{/* <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined"
          label="Job Control Number"
        />
        <TextField
          id="outlined"
          label="Maintenance Event"
          multiline
        />
        <TextField
          id="outlined"
          label="Due"
        />
        <TextField
          id="outlined-number"
          label="Flight Hours"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </Box> */}