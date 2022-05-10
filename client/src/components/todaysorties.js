import React, {useState } from 'react';
import { Card, Grid, Container, Typography, Stack, Checkbox, FormControlLabel } from '@mui/material';
import { aircraft, sorties } from '../mockData';
import { format } from 'date-fns';

const dates = [
  {id: '1', day: Date()},
]

function TodaySorties() {

  const [todaysSorties, setTodaysSorties] = useState(sorties);
  const [tail, setTail] = useState(aircraft);

  return (
  <Container>  
    {dates.map(date => (
      <Card sx={{
        textAlign: 'center', 
        margin: '10px', 
        padding: '10px',
        backgroundColor: '#1A2930'}}
      >  
        <h3 style={{color:'white'}}>{format(new Date(date.day), 'PPPP')}</h3>  
          {todaysSorties.map(todaysSorties => (
            format(new Date(todaysSorties.projected_launch), 'P') === format(new Date(date.day), 'P') ?
              <div>
                <Card sx={{marginBottom:1, backgroundColor: "#FDFD96"}}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                      <Card>
                        <Typography>
                          {todaysSorties.id} | {todaysSorties.callsign}
                        </Typography>
                        <Typography>
                          {todaysSorties.projected_launch.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })} - {todaysSorties.projected_land.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                        <Typography>
                          {todaysSorties.req_fuel}K | HSABS
                        </Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={4}>
                      <Card>  
                        <Typography>
                          {todaysSorties.tail_number}
                        </Typography>
                        <Typography sx={{color: 'green', fontWeight: 'bold'}}>
                          FMC | {todaysSorties.req_fuel}K
                        </Typography>
                        <Typography>
                          Launch Location: {todaysSorties.launch_location}
                        </Typography>
                      </Card>  
                    </Grid>
                    <Grid item xs={8}>
                      <Card sx={{display: 'flex', flexDirection: 'column'}}>
                          <FormControlLabel control={<Checkbox/>} label="Crew Show" />
                          <FormControlLabel control={<Checkbox/>} label="Crew Ready"/>
                          <FormControlLabel control={<Checkbox/>} label="Eng. Start"/>
                          <FormControlLabel control={<Checkbox/>} label="Taxi"/>
                      </Card>  
                    </Grid>
                  </Grid>
                </Card>
              </div>
            : null
          ))}
        </Card>
      ))}
  </Container>
   )
 }

export default TodaySorties;