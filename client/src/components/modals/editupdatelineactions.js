import React, { useState, useEffect } from 'react';
import { Input, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, styled } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
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

export default function EditUpdateLineAction(flyer) {
  const [tail, setTail] = useState(flyer)
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  };

  const handleChange = () => {

  };

  return <>
    <div>
      <div>Edit your Updates</div>
      <button onClick={handleOpen}> Edit </button>
    </div>
    <BootstrapDialog
        onClose={e => {handleClose(e)}}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={e => {handleClose(e)}}>
          Line Actions
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <input type='date' defaultValue={tail.crew_ready} placeholder={tail.crew_ready} />
          <TextField
          type="text" id={tail.id} value={tail.crew_ready} defaultValue={tail.crew_ready}>
            </TextField>
          <input type='date' defaultValue={tail.crew_show} placeholder={tail.crew_show} />
          <input type='date' />
          <input type='date' />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={e => {handleClose(e)}}>
            Update
          </Button>
        </DialogActions>
      </BootstrapDialog>
  </>;
};
