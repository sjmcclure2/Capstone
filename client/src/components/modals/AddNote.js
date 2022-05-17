import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, styled } from '@mui/material';
import { AddOutlined as AddOutlinedIcon, Close as CloseIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
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

  return <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
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
  </DialogTitle>;
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AddNote(props) {
  const [ open, setOpen ] = useState(false);
  const [ newNote, setNewNote ] = useState();
  const tail = props.tail;

  const handleChange = (e) => {
    e.preventDefault();
    setNewNote(e.target.value)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    axios.post(`${BASE_URL}/notes`,
      {
        jcn: tail.driver.jcn,
        note: newNote
      }
    )
    props.addNote(
      {
        note: newNote,
        updated_at: new Date()
      }
    );
    handleClose();
  }

  return <>
    <>
      <AddOutlinedIcon onClick={handleClickOpen}/>
    </>
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        New Note
      </BootstrapDialogTitle>
      <DialogContent dividers>
          <TextField
            id='jcn'
            label="JCN"
            defaultValue={tail.driver.jcn}
            type='tel'
            InputLabelProps={{ shrink: true }}
            sx={{
              paddingBottom: '20px'
            }}
          /><br/>
          <TextField
            onChange={(e) => {handleChange(e)}}
            id="note"
            label="Note"
            type='text' 
            multiline  
            InputLabelProps={{ shrink: true }} 
            sx={{textAlign: 'center'}}
          />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSubmit}>
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  </>;
};
