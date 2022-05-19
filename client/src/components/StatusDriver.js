import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import Notes from './Notes';
import UpdateStatusDriver from './modals/UpdateStatusDriver';
import { BASE_URL } from '../App';

export default function StatusDriver(props) {
  const [driver, setDriver] = useState()
  const jcn = props.acft.driver;
  const tail = props.acft

  useEffect(() => { 
    let d = tail.jcns.find(element => element.jcn === jcn)
    setDriver(d)
  }, [])

  const updateDriver = (tempDriver) => {
    console.log(tempDriver);
    const tempObj = {...driver, ...tempDriver};
    setDriver(tempObj);
  }

  const renderEticUpdate = (param) => {
    switch(param) {
      case null:
        return null;
      case 1:
        return <i><small>(updated {driver.etic_update} time)</small></i>;
      default:
        return <i><small>(updated {driver.etic_update} times)</small></i>;
    }
  }

  const formatDate = (dateToFormat) => {
    if(dateToFormat == null) {
      return null;
    }else
      return format(new Date(dateToFormat), 'd MMM @ HH:mm');
  }

  return( 
    <Box>
      {driver ?
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Typography><b>JCN:</b> {driver?.jcn} </Typography>
        </Grid>
        <Grid item xs={3}> 
          <Typography>
            <b>ETIC:</b> {formatDate(driver?.mx_etic)} {renderEticUpdate(driver.etic_update)} 
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography><b>Mx Start:</b> {formatDate(driver.mx_etic_start)}</Typography>
        </Grid> 
        <Grid item xs={3} sx={{textAlign: 'right'}}>
          <UpdateStatusDriver driver={driver} updateDriver={updateDriver}/>
        </Grid>
        <Grid item xs={3}>
          <Typography><b>Symbol: <span style={{color: 'red'}}>{driver.symbol}</span></b></Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography><b>WUC:</b> {driver.wuc}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography><b>Shop:</b> {driver.shop}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography><b>Discrepancy:</b> {driver.discrepancy}</Typography>
        </Grid>
        <Grid item 
          xs={12}
          sx={{
            textAlign: 'center'
          }}  
        >
          <h4>Notes</h4>
          <Notes tail={driver.notes} />
        </Grid>
      </Grid>
      :
      null} 
    </Box>
  )
}