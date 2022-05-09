import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';

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

function AircraftModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const todaysSorties = props.todaysSorties;

  //need API for axios put request to update the fliers
  // useEffect(() => {
  //   axios.put('missing_api', )
  //       .then(res => console.log(res))
  // }, []);

  return (
    <div>
      <Button sx={{marginTop:1}} size="small" onClick={handleOpen} startIcon={<EditIcon />}>
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
                defaultValue={todaysSorties.tail_number}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined"
                label="Call Sign"
                defaultValue={todaysSorties.callsign}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined"
                label="Launch Location"
                defaultValue={todaysSorties.launch_location}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-number"
                label="Projected Launch"
                defaultValue={todaysSorties.projected_launch.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined"
                label="Hrs. Sched"
                defaultValue={todaysSorties.hours_scheduled}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-number"
                label="Req. Fuel"
                defaultValue={todaysSorties.req_fuel}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined"
                label="Crew Show"
                defaultValue={todaysSorties.crew_show}
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-number"
                label="Crew ready"
                defaultValue={todaysSorties.crew_ready}
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
              />
               <TextField
                id="outlined"
                label="Eng. Start"
                defaultValue={todaysSorties.eng_start}
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
              />
               <TextField
                id="outlined-number"
                label="Taxi"
                defaultValue={todaysSorties.taxi}
                type="time"
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