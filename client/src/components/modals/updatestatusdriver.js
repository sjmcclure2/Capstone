import * as React from 'react';
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
  const [open, setOpen] = React.useState(false);
  const tail = props.tail;

  const formatDate = (dateToFormat) => {
    return format(new Date(dateToFormat), 'kk:mm, P')
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
            label='ETIC'
            defaultValue={formatDate(tail.driver.mx_etic)}
            sx={{
              paddingBottom: '20px',
              textAlign: 'center'
            }}
          />
          <TextField 
            id='mx_etic_start'
            label='Mx Start'
            defaultValue={formatDate(tail.driver.mx_etic_start)}
            sx={{
              paddingBottom: '20px',
              textAlign: 'center'
            }}
          />
          <TextField
            id='wuc'
            label='WUC'
            defaultValue={tail.driver.wuc}
            sx={{
              paddingBottom: '20px',
              textAlign: 'center'
            }}
          />
          <TextField
            id='shop'
            label='Shop'
            defaultValue={tail.driver.shop}
            sx={{
              paddingBottom: '20px',
              textAlign: 'center'
            }}
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
