import React, { useState } from 'react';
import { Avatar, Box, Card, CardHeader, Grid, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import UpdateStatus from './modals/updatestatus';

export default function AircraftStatus(props) {
  const [tail, setTail] = useState(props.tail);

  const formatDate = (dateToFormat) => {
    return format(new Date(dateToFormat), 'iii, d MMM')
  }

  return (
    <Box
      sx={{
        backgroundColor: '#1A2930',
        width: '100%',
        alignItems: 'center'
      }}
    >
      <Grid container sx={{alignItems: 'center', justifyContent: 'center'}}>
        <Grid item xs={1}>
          <Avatar 
            alt={tail.tail_number} 
            // src={tail.noseart} 
            sx={{
              marginRight: '15px',
              height: '56px', 
              width: '56px'}}
          />
        </Grid>
        <Grid 
          item 
          xs={2}
        >
          <Card
            elevation={0}
            sx={{
              backgroundColor: '#1A2930',
              color: 'white',
              textAlign: 'left'
            }}
          >        
            <h2 style={{margin: 0, padding: 0}}>{tail.tail_number}</h2>
            <h2 style={{margin: 0, padding: 0}}>{<UpdateStatus status={tail.status} id={tail.id}/>}</h2>
          </Card> 
        </Grid>
        <Grid 
          item 
          xs={3} 
        >
          <Card 
            elevation={0} 
            sx={{ 
              flexShrink: 0, 
              backgroundColor: '#1A2930', 
              color: 'white'
            }}
          >
            <Stack 
              direction="row"
              alignItems='center'
            >
              <UpdateStatus fuel={tail.fuel_quant} id={tail.id}/>k
            </Stack>
            <Stack 
              direction="row"
              alignItems='center'
            >
              <UpdateStatus location={tail.location} id={tail.id}/>
            </Stack>
          </Card>
        </Grid>
        <Grid 
          item 
          xs={4}
        >
          <Card 
            elevation={0} 
            sx={{ 
              flexShrink: 0, 
              backgroundColor: '#1A2930', 
              color: 'white'
              }}
          >
            {tail.last_sortie ? <Typography><b>Last Fly:</b> {formatDate(tail.last_sortie.actual_land)}</Typography> : null}
            {tail.next_sortie ? <Typography><b>Next Fly:</b> {formatDate(tail.next_sortie.projected_launch)}</Typography> : null}
            <Typography><b>Airframe Hours:</b> {tail.operating_hrs}</Typography><br/>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}