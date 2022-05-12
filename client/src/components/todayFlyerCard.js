import * as React from 'react';
import { Card, Grid, Container, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { format, formatISO9075 } from 'date-fns';


export default function TodayFlyerCard ({flyer, curDate}) {
  const [todaysSortie, setTodaysSortie] = React.useState(flyer)
  const [date, setDate] = React.useState(curDate)

  return (
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
                  {/* <FormControlLabel control={<Checkbox/>} label="Crew Show" onClick={() => setCurrentDate(`${formatISO9075(Date.now())}`)}/> {currentDate} 
                  <FormControlLabel control={<Checkbox/>} label="Crew Ready"/>
                  <FormControlLabel control={<Checkbox/>} label="Eng. Start"/>
                  <FormControlLabel control={<Checkbox/>} label="Taxi"/> */}
                <div>Crew Show: <input type="time" value={format(new Date(todaysSortie.crew_show), 'KK:mm')}/></div>
                <div>Crew Ready: <input type="time" value={format(new Date(todaysSortie.crew_ready), 'KK:mm')}/></div>
                <div>Eng. Start: <input type="time" value={format(new Date(todaysSortie.eng_start), 'KK:mm')}/></div>
                <div>Taxi: <input type="time" value={format(new Date(todaysSortie.taxi), 'KK:mm')}/></div>
              </Card>  
            </Grid>
          </Grid>
        </Card>
      </div>
    : null
  );
}