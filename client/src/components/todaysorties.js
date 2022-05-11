import React, {useState } from 'react';
import { Card, Grid, Container, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { format } from 'date-fns';
import { BASE_URL } from '../App';
const dates = [
  {id: '1', day: Date()},
]

function TodaySorties() {

  const [todaysSorties, setTodaysSorties] = useState([]);
  const [currentDate, setCurrentDate] = useState(``);
  
  React.useEffect(() => {
    fetch(`${BASE_URL}/flying_schedule`)
      .then(res => res.json())
      .then(data => setTodaysSorties(data))
  }, [])

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
          {todaysSorties.map(todaysSortie => (
            format(new Date(todaysSortie.projected_launch), 'P') === format(new Date(date.day), 'P') ?
              <div>
                <Card sx={{marginBottom:1, backgroundColor: "#FDFD96", padding: '7px'}}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                      <Card>
                        <Typography>
                          {todaysSortie.aircraft_id} | {todaysSortie.callsign}
                        </Typography>
                        <Typography>
                          {format(new Date(todaysSortie.projected_launch), 'KK:mm')} - {format(new Date(todaysSortie.projected_land), 'KK:mm')}
                        </Typography>
                        <Typography>
                          {todaysSortie.req_fuel}K | HSABS
                        </Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={5}>
                      <Card>  
                        <Typography>
                          {todaysSortie.tail_number}
                        </Typography>
                        <Typography sx={{color: 'green', fontWeight: 'bold'}}>
                          FMC | {todaysSortie.req_fuel}K
                        </Typography>
                        <Typography>
                          Launch Location: {todaysSortie.launch_location}
                        </Typography>
                      </Card>  
                    </Grid>
                    <Grid item xs={7}>
                      <Card sx={{display: 'flex', flexDirection: 'column'}}>
                          <FormControlLabel control={<Checkbox/>} label="Crew Show" onClick={() => setCurrentDate(`${formatISO9075(Date.now())}`)}/>
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