import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)', 
  width: "auto",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AircraftModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //need API for axios put request to update the fliers
  // useEffect(() => {
  //   axios.put('missing_api', )
  //       .then(res => console.log(res))
  // }, []);

  return (
    <div>
      <Button sx={{marginTop:1}}variant="contained" size="small" onClick={handleOpen}>
        Click to Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                label="Aircraft"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined"
                label="Call Sign"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined"
                label="Actual T.O."
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-number"
                label="Sched Land"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined"
                label="Crew Show"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-number"
                label="Sortie"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined"
                label="Eng. Start"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-number"
                label="Location"
                InputLabelProps={{
                  shrink: true,
                }}
              />
               <TextField
                id="outlined"
                label="Fuel"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
               <TextField
                id="outlined-number"
                label="Target"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <Button sx={{alignContent:'right'}}variant="contained" onClick={handleClose}>
              Update Status
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
export default AircraftModal;