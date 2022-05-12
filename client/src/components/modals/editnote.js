import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
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

export default function EditNote(props) {
  const [open, setOpen] = useState(false);
  const [newNote, setNewNote] = useState();
  const tail = props.tail;
  const note = props.note;

  const handleChange = (e) => {
    e.preventDefault();
    setNewNote(e.target.value)
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const submitChange = () => {
    axios.patch(`${BASE_URL}/notes/${note.id}`, 
      {
        jcn: tail.driver.jcn,
        note: newNote
      }
    )
    .then((res) => console.log(res))
    handleClose()
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditOutlinedIcon/>
      </IconButton>
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
              defaultValue={tail.driver.jcn}
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