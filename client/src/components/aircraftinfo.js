import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { format } from 'date-fns';
import Notes from './notes';
import UpdateStatusDriver from './modals/updatestatusdriver';

export default function AircraftInfo(props) {
  const tail = props.tail;

  const renderEticUpdate = (param) => {
    switch(param) {
      case null:
        return null;
      case 1:
        return <i><small>(updated {tail.driver.etic_update} time)</small></i>;
      default:
        return <i><small>(updated {tail.driver.etic_update} times)</small></i>;
    }
  }

  const formatDate = (dateToFormat) => {
    return format(new Date(dateToFormat), 'kk:mm, P')
  }

  return(
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Typography><b>JCN:</b> {tail.driver.jcn} </Typography>
        </Grid>
        <Grid item xs={3}> 
          <Typography>
            <b>ETIC:</b> {formatDate(tail.driver.mx_etic)}  {renderEticUpdate(tail.driver.etic_update)}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography><b>Mx Start:</b> {formatDate(tail.driver.mx_etic_start)}</Typography>
        </Grid>
        <Grid item xs={3} sx={{textAlign: 'right'}}>
          <UpdateStatusDriver tail={tail}/>
        </Grid>
        <Grid item xs={3}>
          <Typography><b>Symbol: <span style={{color: 'red'}}>{tail.driver.symbol}</span></b></Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography><b>WUC:</b> {tail.driver.wuc}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography><b>Shop:</b> {tail.driver.shop}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography><b>Descrepancy:</b> {tail.driver.discrepancy}</Typography>
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