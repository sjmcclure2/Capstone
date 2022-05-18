import React, { useEffect, useState } from 'react';
import { Avatar, Box, Card, Grid, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import UpdateStatus from './modals/UpdateStatus';
import { noseArt } from '../noseArt'
import { BASE_URL } from '../App';

export default function AircraftStatus(props) {
  const [ tail, setTail ] = useState(props.tail);
  const [ locations, setLocations ] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/locations`)
    .then(res => res.json())
    .then(data => setLocations(data))
    }, [])

  const updateStatus = (key, data) => {
    let tempTail = {...tail};
    tempTail[key] = data;
    setTail(tempTail); 
  }

  const formatDate = (dateToFormat) => {
    return format(new Date(dateToFormat), 'iii, d MMM')
  }

  return (
    <Box sx={{backgroundColor: '#1A2930',padding: '10px'}}>
      <Grid container>
        <Grid item xs={6}>
          <Avatar alt={tail.tail_number} src={noseArt[props.index]} sx={{ height: '56px', width: '56px', marginLeft: 'auto', marginRight: 'auto'}}/>
        </Grid>
        <Grid item xs={6} sx={{textAlign: 'center'}}>
          <Card elevation={0} sx={{ flexShrink: 0, backgroundColor: '#1A2930', color: 'white'}}>
           <Stack direction="row" alignItems='center' sx={{justifyContent:'center'}}>
              <UpdateStatus fuel={tail.fuel_quant} id={tail.id} update={updateStatus}/>k
            </Stack>
            <Stack direction="row"alignItems='center' sx={{justifyContent:'center'}}>
              <UpdateStatus location={tail.location_name} id={tail.id} update={updateStatus} locations={locations}/>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={6} sx={{textAlign: 'center'}}>
          <Card elevation={0}sx={{backgroundColor: '#1A2930',color: 'white'}}>        
            <h2 style={{margin: 0, padding: 0}}>{tail.tail_number}</h2>
            <h2 style={{margin: 0, padding: 0}}>{<UpdateStatus status={tail.status.toUpperCase()} id={tail.id} update={updateStatus}/>}</h2>
          </Card>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'center'}}>
          <Card elevation={0} sx={{ flexShrink: 0, backgroundColor: '#1A2930', color: 'white'}}>
            {tail.last_sortie ? <Typography><b>Last Fly:</b> {formatDate(tail.last_sortie.actual_land)}</Typography> : null}
            {tail.next_sortie ? <Typography><b>Next Fly:</b> {formatDate(tail.next_sortie.projected_launch)}</Typography> : null}
            <Typography><b>Airframe Hours:</b> {tail.operating_hrs}</Typography><br/>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}