import React, {useState, useEffect } from 'react';
import { Card, Grid, Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import AircraftModal from './aircraftmodal';
import { aircraft, sorties } from '../mockData';
import { add, format } from 'date-fns';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const dates = [
  {id: '1', day: Date()},
]

function TodaySorties() {

  const [todaysSorties, setTodaysSorties] = useState(sorties);
  const [todaysAircraft, setTodaysAircraft] = useState(aircraft);

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
                  <h1>{todaysSorties.id} | {todaysSorties.callsign}</h1>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={3}>
                      <Typography>Aircraft: {todaysSorties.tail_number}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>Call Sign: {todaysSorties.callsign}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>Launch Location: {todaysSorties.launch_location}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>Projected Launch: {todaysSorties.projected_launch.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography> Hrs. Sched: {todaysSorties.hours_scheduled}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>Req. Fuel: {todaysSorties.req_fuel}K</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>Crew Show: {todaysSorties.crew_show}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>Crew Ready: {todaysSorties.crew_ready}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>Eng. Start: {todaysSorties.eng_start}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>Taxi: {todaysSorties.taxi}</Typography>
                    </Grid>
                  </Grid>
                  <AircraftModal todaysSorties={todaysSorties}/>
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