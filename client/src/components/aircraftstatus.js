import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AircraftStatus() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
       >
        <Box
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
        </Box>
      </Modal>
    </div>
  );
}

export default AircraftStatus;

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