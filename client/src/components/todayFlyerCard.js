import * as React from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import  axios from 'axios';
import { BASE_URL } from '../App';
import EditUpdateLineAction from './modals/editupdatelineactions';



export default function TodayFlyerCard ({flyer, curDate}) {
  const [ todaysSortie ] = React.useState(flyer)
  const [ crew_show, setCrew_show ] = React.useState(flyer.crew_show != null ? format(new Date(flyer.crew_show), "HH:mm"): "")
  const [ crew_ready, setCrew_ready ] = React.useState(flyer.crew_ready != null ? format(new Date(flyer.crew_ready), "HH:mm") : "")
  const [ eng_start, setEng_start ] = React.useState(flyer.eng_start != null ? format(new Date(flyer.eng_start), "HH:mm") : "")
  const [ taxi, setTaxi ] = React.useState(flyer.taxi != null ? format(new Date(flyer.taxi), "HH:mm") : "")

  const csonClick = () => {
    let now = new Date()
    let aValue = now.toISOString()
    setCrew_show(format(new Date(now), "HH:mm"))
    axios.patch(`${BASE_URL}/flying_schedule/${flyer.id}`, {'crew_show': `${aValue}`}).then(res => console.log(res))
  };

  const cronClick = () => {
    let now = new Date()
    let aValue = now.toISOString()
    setCrew_ready(format(new Date(now), "HH:mm"))
    axios.patch(`${BASE_URL}/flying_schedule/${flyer.id}`, {'crew_ready': `${aValue}`}).then(res => console.log(res))
  };

  const esonClick = () => {
    let now = new Date()
    let aValue = now.toISOString()
    setEng_start(format(new Date(now), "HH:mm"))
    axios.patch(`${BASE_URL}/flying_schedule/${flyer.id}`, {'eng_start': `${aValue}`}).then(res => console.log(res))
  };

  const tonClick = () => {
    let now = new Date()
    let aValue = now.toISOString()
    setTaxi(format(new Date(now), "HH:mm"))
    axios.patch(`${BASE_URL}/flying_schedule/${flyer.id}`, {'taxi': `${aValue}`}).then(res => console.log(res))
  };

  return (
      <div>
        <Card sx={{marginBottom:1, backgroundColor: "#FDFD96", padding: '7px'}}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <Card>
                <Typography>
                  {todaysSortie.aircraft_id} | {todaysSortie.callsign}
                </Typography>
                <Typography>
                  {format(new Date(todaysSortie.projected_launch), 'HH:mm')} - {format(new Date(todaysSortie.projected_land), 'HH:mm')}
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
                <div>
                  <> Crew Show: </>
                    {crew_show.length > 0 ? <> {crew_show} </> : <input type='button' value={'Set'} onClick={csonClick} />}
                </div>
                <div>
                  <>Crew Ready: </> 
                  {crew_ready.length > 0 ? <> {crew_ready} </> : <input type='button' value={'Set'} onClick={cronClick} />}
                </div>
                <div>
                  <>Engine Start:</>
                  {eng_start.length > 0 ? <> {eng_start} </> : <input type='button' value={'Set'} onClick={esonClick} />}
                </div>
                <div>
                  <>Taxi:</>
                {taxi.length > 0 ? <> {taxi} </> : <input type='button' value={'Set'} onClick={tonClick} />}
                </div>
                  <EditUpdateLineAction flyer={todaysSortie}/>
              </Card>  
            </Grid>
          </Grid>
        </Card>
      </div>
  );
};