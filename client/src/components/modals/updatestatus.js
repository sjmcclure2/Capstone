import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, styled, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
  const [type, setType] = useState('');
  const [data, setData] = useState();
  const [key, setKey] = useState();
  const prop = Object.keys(props)
  var propKey = prop[0];

   useEffect(() => {
    switch (propKey) {
      case 'status':
        setKey('status');
        setType(props.status)
        break;
      case 'fuel':
        setType(props.fuel)
        setKey('fuel_quant')
        break;
      case 'location':
        setKey('location')
        setType(props.location)
        break;
      default:
        break;
    } 
  }, [props])

  const handleChange = (e) => {
    e.preventDefault();
    setData(e.target.value)
  };

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleUpdate = (e) => {
    axios.patch(`${BASE_URL}/aircraft_status/${props.id}`,
      {[key]: data}
    )
    props.update(key, data)
    handleClose(e);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const statusColor = (status) => { 
    if(status.includes('FMC')) {
      return <span style={{color:'green'}}><b>{status}</b></span>
    } else if (status.includes('PMC')) {
        return <span style={{color:'yellow'}}><b>{status}</b></span>
    } else if (status.includes('NMC')) {
        return <span style={{color:'red'}}><b>{status}</b></span>
    } else  
        return <span style={{color:'black'}}><b>{status}</b></span>
  }

  const statusList = [
    'FMC', 'PMC', 'PMCSH', 'PMCMG', 'PMCBF', 'NMC', 'NMCMC', 'NMCMM', 'NMCBA', 'NMCSE', 'NMCMD', 'NMCSH'
    ]

  const selectList = (key, item) => {
    if(key === 'status') {
      return ( 
        <Select 
          labelId={item} 
          id={item} 
          value={type} 
          label={item} 
          onClick={e => {e.stopPropagation()}}
          onChange={e => {handleChange(e)}}
          sx={{width: '25vw'}}
        >
          {statusList.map(itm => 
            <MenuItem value={itm}>{itm}</MenuItem>
          )}
        </Select>
      )
    }
    else 
      return (
        <TextField
          onClick={e => {e.stopPropagation()}}
          onChange={e => {handleChange(e)}}
          id={propKey}
          defaultValue={type}
        />
      )
    }
  

  return (
    <div>
      <Button 

        variant="text" 
        onClick={e => {handleClickOpen(e)}}
        sx={{
          padding: '0px', 
          margin: '0px',
          color: 'white',
          fontSize: '16px'
        }}  
      >
        {propKey === 'status' ? statusColor(type) : <span><b>{propKey}:</b> {type}</span>}
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
          {selectList(key, type)}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={e => {handleUpdate(e)}}>
            Update
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}


// PATCH to aircraft_status