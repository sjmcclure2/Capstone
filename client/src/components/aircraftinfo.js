import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { format } from 'date-fns';
import Notes from './notes';

export default function AircraftInfo(props) {
  const tail = props.tail;

  const renderEticUpdate = (param) => {
    switch(param) {
      case 0:
        return null;
      case 1:
        return <i><small>(updated {tail.driver_jcn.etic_update} time)</small></i>;
      default:
        return <i><small>(updated {tail.driver_jcn.etic_update} times)</small></i>;
    }
  }

  return(
    <Box>
      <Grid container spacing={1}>
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
  )
}