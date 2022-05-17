import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { BASE_URL } from '../../App';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function EditUpdateLineAction({flyer, updateState} ) {
  const [ open, setOpen ] = useState(false);
  const [ crewShow, setCrewShow ] = useState(flyer.crew_show);
  const [ crewReady, setCrewReady ] = useState(flyer.crew_ready);
  const [ engStart, setEngStart ] = useState(flyer.eng_start);
  const [ taxi, setTaxi ] = useState(flyer.taxi);
  const [ takeOff, setTakeoff ] = useState(flyer.actual_launch);

  useEffect(() => {}, [ open ]);

  const formatDate = (time) => {
    if(time === null) return null;
    return format(new Date(time), "yyyy-MM-dd'T'HH:mm:ss");
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  };

  const handleChange = (e) => {
    switch(e.target.name) {
      case 'crew_ready':
        setCrewReady(e.target.value);
        break;
      case 'crew_show':
        setCrewShow(e.target.value);
        break;
      case 'eng_start':
        setEngStart(e.target.value);
        break;
      case 'taxi':
        setTaxi(e.target.value);
        break;
      case 'actual_launch':
        setTakeoff(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    axios.patch(`${BASE_URL}/flying_schedule/${flyer.id}`,
      {
        'crew_ready': crewReady && new Date(crewReady).toISOString(),
        'crew_show': crewShow && new Date(crewShow).toISOString(),
        'eng_start': engStart && new Date(engStart).toISOString(),
        'taxi': taxi && new Date(taxi).toISOString(),
        'actual_launch': takeOff && new Date(takeOff).toISOString()
      }
    ).then(res => console.log(res))

    updateState(crewReady, crewShow, engStart, taxi, takeOff);
    
    handleClose();
  }

  return <>
    <div>
      <Button onClick={handleOpen}> Edit </Button>
    </div>
    <BootstrapDialog
        onClose={e => {handleClose(e)}}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={e => {handleClose(e)}}>
          Line Actions
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{display: 'flex', flexDirection: 'column'}}>
          <label>Crew Ready:
            <input type='datetime-local' name='crew_ready' onChange={e =>{handleChange(e)}} defaultValue={formatDate(crewReady)} />
          </label>
          <label>Crew Show:
            <input type='datetime-local' name='crew_show' onChange={e =>{handleChange(e)}} defaultValue={formatDate(crewShow)} />
          </label>
          <label>Engine Start:
            <input type='datetime-local' name='eng_start' onChange={e =>{handleChange(e)}} defaultValue={formatDate(engStart)} />
          </label>
          <label>Taxi:
            <input type='datetime-local' name='taxi' onChange={e =>{handleChange(e)}} defaultValue={formatDate(taxi)} />
          </label>
          <label>Take Off:
            <input type='datetime-local' name='actual_launch' onChange={e =>{handleChange(e)}} defaultValue={formatDate(takeOff)} />
          </label>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Update
          </Button>
        </DialogActions>
      </BootstrapDialog>
  </>;
};
