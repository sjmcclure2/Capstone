import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, styled } from '@mui/material';
import { Close as CloseIcon, EditOutlined as EditOutlinedIcon } from '@mui/icons-material';
import axios from 'axios';
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

export default function EditNote(props) {
  const [ open, setOpen ] = useState(false);
  const [ newText, setNewText ] = useState();
  const note = props.note;

  const handleChange = (e) => {
    e.preventDefault();
    setNewText(e.target.value)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const submitChange = () => {
    axios.patch(`${BASE_URL}/notes/${note.id}`, 
      {
        jcn: note.jcn,
        note: newText,
        updated_at: new Date()
      }
    );
    const updatedNote = { ...note, 'note': newText };
    props.updateNote(note.id, updatedNote); 
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <>
        <EditOutlinedIcon onClick={handleClickOpen}/>
      </>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Note
        </BootstrapDialogTitle>
        <DialogContent dividers>
            <TextField
              id='jcn'
              label="JCN"
              defaultValue={note.jcn}
              type='tel'
              sx={{
                paddingBottom: '20px',
                textAlign: 'center'
              }}
            /><br/>
            <TextField
              onChange={(e) => {handleChange(e)}}
              id="note"
              label="Note"
              defaultValue={note.note}
              type='text' 
              multiline   
            />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={submitChange}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}