import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function ScheduledMx() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[1, 2, 3].map((value) => (
        <ListItem
          key={value}
          disableGutters
        >
          <ListItemText primary={`Line item ${value}`} />
        </ListItem>
      ))}
    </List>
  );
}


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