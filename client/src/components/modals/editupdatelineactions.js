import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

// import { BASE_URL } from '../../App';

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

export default function EditUpdateLineAction({flyer}) {
  const [ tail ] = useState(flyer);
  const [ open, setOpen ] = useState(false);
  // const [key, setKey] = useState();
  // const [value, setValue] = useState();


  useEffect(()=>{},[open])

  const formatDate = (time) => {
    if(time === null) {
      return time;
    }
    return format(new Date(time), 'HH:mm');
  }
 
  // useEffect(() => {

  // }, [])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  };

  // const handleChange = () => {
  //   axios.patch(`${BASE_URL}/flying_schedule/${flyer.id}`,
  //     {[key]: value}
  //   ).then(res => console.log(res));
  //   handleClose(e);
  // };

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
        <DialogContent dividers sx={{display: 'flex'}}>
          <div>Crew Show: <input type='time' defaultValue={formatDate(tail.crew_show)}/></div>
          <div>Crew Ready: <input type='time' defaultValue={formatDate(tail.crew_ready)}/></div>
          <div>Engine Start: <input type='time' defaultValue={formatDate(tail.eng_start)}/></div>
          <div>Taxi: <input type='time' defaultValue={formatDate(tail.taxi)}/></div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={e => {handleClose(e)}}>
            Update
          </Button>
        </DialogActions>
      </BootstrapDialog>
  </>;
};
