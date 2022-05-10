import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, Grid, Card } from '@mui/material';
import Notes from '../notes';
import { format } from 'date-fns';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AircraftInfoCard(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const tail = props.tail;

  const renderEticUpdate = (props) => {
    switch(props) {
      case 0:
        return null;
      case 1:
        return <i><small>(updated {tail.driver_jcn.etic_update} time)</small></i>;
      default:
        return <i><small>(updated {tail.driver_jcn.etic_update} times)</small></i>;
    }
  }

  return (
    <div>
      <Button 
        onClick={handleOpen}
      >
        <Typography>
          {tail.id}
        </Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card 
            elevation={0} 
            sx={{ 
              width: '100%', 
              flexShrink: 0, 
              backgroundColor: '#1A2930', 
              color: 'white',
              padding: '15px',
              marginBottom: '15px'
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Avatar 
                alt={tail.id} 
                src={tail.noseart} 
                sx={{
                  marginRight: '10px', 
                  height: '56px', 
                  width: '56px',
                }}
              />
              </Grid>
              <Grid xs={6}>
                <Typography
                  sx={{
                    paddingTop: '15px',
                    textAlign: 'center'
                  }}
                >
                  <b>{tail.id}</b> <br></br> {tail.status} <br></br> <small>{tail.wuc}</small>
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Typography 
                  sx={{ 
                    width: '65%', 
                    flexShrink: 0,
                    paddingTop: '15px',
                    textAlign: 'center'
                  }}
                >
                  Fuel: {tail.fuel_quant}k  <br></br>  Parking: {tail.location} <br></br> <small>{tail.discrepancy}</small>
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <Typography 
            variant='h4'
            sx={{
              textAlign: 'center'
            }}
          >
            Status Driver
          </Typography>
          <Grid container 
            spacing={1}
          >
            <Grid item xs={4}>
              <Typography><b>JCN:</b> {tail.driver_jcn.jcn} </Typography>
            </Grid>
            <Grid item xs={4}> 
              <Typography>
                <b>ETIC:</b> {format(new Date(tail.driver_jcn.mx_etic), 'kkmm, P')}  {renderEticUpdate(tail.driver_jcn.etic_update)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography><b>Mx Start:</b> {format(new Date(tail.driver_jcn.mx_etic_start), 'kkmm, P')}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography><b>Symbol: <span style={{color: 'red'}}>{tail.driver_jcn.symbol}</span></b></Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography><b>WUC:</b> {tail.driver_jcn.wuc}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography><b>Shop:</b> {tail.driver_jcn.shop}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><b>Descrepancy:</b> {tail.driver_jcn.discrepancy}</Typography>
            </Grid>
            <Grid item 
              xs={12}
              sx={{
                textAlign: 'center'
              }}  
            >
              <h4>Notes</h4>
              <Notes tail={tail}/>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
