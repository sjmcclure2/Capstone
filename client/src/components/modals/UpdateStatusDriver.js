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
import { TextField } from '@mui/material';
import { format } from 'date-fns';
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

export default function UpdateStatusDriver(props) {
  const tail = props.tail;
  const [open, setOpen] = useState(false);
  const [etic, setEtic] = useState(tail.driver.mx_etic);
  const [mxStart, setMxStart] = useState(tail.driver.mx_etic_start);
  const [wuc, setWuc] = useState(tail.driver.wuc);
  const [shop, setShop] = useState(tail.driver.shop);

  const formatDate = (time) => {
    if (time === null) return null;
    return format(new Date(time), "yyyy-MM-dd'T'HH:mm:ss");
  };

  const handleUpdate = (e) => {
    switch(e.target.name) {
      case 'ETIC':
        setEtic(e.target.value);
        break;
      case 'mxStart':
        setMxStart(e.target.value);
        break;
      case 'wuc':
        setWuc(e.target.value);
        break;
      case 'shop':
        setShop(e.target.value)
        break;
      default:
        break; 
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    //handleUpdate();
    console.log('ETIC:', etic);
    console.log(new Date(etic));
    console.log(new Date(etic).toISOString);
    console.log('Mx Start:', mxStart);
    console.log(new Date(mxStart));
    console.log(new Date(mxStart).toISOString);
    // axios.patch(`${BASE_URL}/imds/${tail.driver.jcn}`,
    // {
    //   'mx_etic': new Date(etic).toISOString(),
    //   'mx_etic_start': new Date(mxStart).toISOString(),
    //   'shop': shop,
    //   'wuc': wuc
    // })
    //.then((res) => console.log(res))
    handleClose();
  }

  return (
    <div>
      <Button 
        variant="text" 
        onClick={handleClickOpen} 
      >
        Update 
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Update Status Driver
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TextField 
            id='jcn'
            label='JCN'
            defaultValue={tail.driver.jcn}
            type='tel' 
            sx={{
              paddingBottom: '20px',
              textAlign: 'center'
            }}
          />
          <TextField
            id='mx_etic'
            name='ETIC'
            label='ETIC'
            type='datetime-local'
            onChange={e => {handleUpdate(e)}}
            defaultValue={formatDate(tail.driver.mx_etic)}
            InputLabelProps={{ shrink: true }}
            sx={{
              paddingBottom: '20px',
              textAlign: 'center'
            }}
          />
          <TextField 
            id='mx_etic_start'
            name='mxStart'
            label='Mx Start'
            type='datetime-local'
            onChange={e => {handleUpdate(e)}}
            defaultValue={formatDate(tail.driver.mx_etic_start)}
            InputLabelProps={{ shrink: true }}
            sx={{
              paddingBottom: '20px',
              textAlign: 'center'
            }}
          />
          <TextField
            id='wuc'
            name='wuc'
            label='WUC'
            onChange={e => {handleUpdate(e)}}
            defaultValue={tail.driver.wuc}
            sx={{
              paddingBottom: '20px',
              textAlign: 'center'
            }}
          />
          <TextField
            id='shop'
            name='shop'
            label='Shop'
            onChange={e => {handleUpdate(e)}}
            defaultValue={tail.driver.shop}
            sx={{
              paddingBottom: '20px',
              textAlign: 'center'
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
