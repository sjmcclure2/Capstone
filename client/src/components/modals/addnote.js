import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { TextField } from '@mui/material';
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

export default function AddNote(props) {
  const [open, setOpen] = useState(false);
  const [newNote, setNewNote] = useState();
  const tail = props.tail;

  const handleChange = (e) => {
    e.preventDefault();
    setNewNote(e.target.value)
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    axios.post(`${BASE_URL}/notes`,
      {
        jcn: tail.driver.jcn,
        note: newNote
      }
    )
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <AddOutlinedIcon/>
      </IconButton>
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
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}