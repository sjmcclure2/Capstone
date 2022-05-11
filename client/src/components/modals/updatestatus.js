import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../App';

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

export default function UpdateStatus(props) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState();
  const [data, setData] = useState();
  const prop = Object.keys(props)
  const propKey = prop[0];

   useEffect(() => {
    switch (propKey) {
      case 'status':
        setType(props.status)
        break;
      case 'fuel':
        setType(props.fuel)
        break;
      case 'location':
        setType(props.location)
        break;
    } 
  }, [])

  const handleChange = (e) => {
    e.preventDefault();
    setData(e.target.value)
  }
  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    axios.put(`${BASE_URL}`)
    setOpen(false);
  };

  return (
    <div>
      <Button 
        variant="text" 
        onClick={e => {handleClickOpen(e)}}
        sx={{
          padding: '0px', 
          margin: '0px',
          fontSize: '16px',
          color: 'white'
        }}  
      >
        {propKey == 'status' ? <b>{type}</b> : <span><b>{propKey}:</b> {type}</span>}
      </Button>
      <BootstrapDialog
        onClose={e => {handleClose(e)}}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={e => {handleClose(e)}}>
          Edit {propKey}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TextField
            onClick={e => {e.stopPropagation()}}
            onChange={e => {handleChange(e)}}
            id={propKey}
            defaultValue={type}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={e => {handleClose(e)}}>
            Update
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}


// PATCH to aircraft_status