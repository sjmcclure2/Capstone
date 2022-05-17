import React from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { format } from 'date-fns';
import  axios from 'axios';

import { BASE_URL } from '../App';
import EditUpdateLineAction from './modals/EditUpdateLineActions';

export default function TodayFlyerCard ({flyer, curDate}) {
  const [ todaysSortie, setTodaysSortie ] = React.useState(flyer);

  // force re-render on state change
  React.useEffect(() => {}, [ todaysSortie ]);

  const setTime = (e) => {
    const now = new Date().toISOString();
    setTodaysSortie({ ...todaysSortie, [e.target.name]: now });
    // axios.patch(`${BASE_URL}/flying_schedule/${flyer.id}`, { [e.target.name]: now })
    //   .then(res => console.log(res));
  };

  const updateState = (crew_ready, crew_show, eng_start, taxi, actual_launch) => {
    setTodaysSortie(
      { ...todaysSortie,
        crew_ready,
        crew_show,
        eng_start,
        taxi,
        actual_launch }
    )
  };

  const statusColor = (status) => { 
    if(status.includes('FMC')) {
      return <span style={{color:'green'}}><b>{status}</b></span>
    } else if (status.includes('PMC')) {
        return <span style={{fontWeight:'bold', color:'yellow', WebkitTextStroke:'.5px grey'}}><b>{status}</b></span>
    } else if (status.includes('NMC')) {
        return <span style={{color:'red'}}><b>{status}</b></span>
    } else  
        return <span style={{color:'black'}}><b>{status}</b></span>
  }

  return (
      <div>
        <Card sx={{marginBottom:1, backgroundColor: "#FDFD96", padding: '7px'}}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <Card>
                <Typography>
                  <b>{todaysSortie.id} | {todaysSortie.callsign}</b>
                </Typography>
                <Typography>
                  <ArrowUpwardSharpIcon fontSize='small' sx={{color: green[500]}}/>
                  {format(new Date(todaysSortie.projected_launch), 'HH:mm')} <>&nbsp;</>
                   <ArrowDownwardSharpIcon fontSize='small' sx={{color: red[500]}}/> 
                  {format(new Date(todaysSortie.projected_land), 'HH:mm')}
                </Typography>
                <Typography>
                  {todaysSortie.req_fuel}K | HSABS
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={5}>
              <Card>  
                <Typography>
                  <b>{todaysSortie.tail_number}</b>
                </Typography>
                <Typography sx={{fontWeight: 'bold'}}>
                  {statusColor(todaysSortie.status)} | {todaysSortie.fuel_quant}K
                </Typography>
                <Typography>
                  Launch Location: {todaysSortie.launch_location}
                </Typography>
              </Card>  
            </Grid>
            <Grid item xs={7}>
              <Card sx={{display: 'flex', flexDirection: 'column'}}>
                <div>
                  Crew Ready:&nbsp;
                  {todaysSortie.crew_ready
                    ? format(new Date(todaysSortie.crew_ready), 'HH:mm')
                    : <input type='button' name='crew_ready' value={'Set'} onClick={(e) => {setTime(e)}} />}
                </div>
                <div>
                  Crew Show:&nbsp;
                  {todaysSortie.crew_show
                    ? format(new Date(todaysSortie.crew_show), 'HH:mm')
                    : <input type='button' name='crew_show' value={'Set'} onClick={(e) => {setTime(e)}} />}
                </div>
                <div>
                  Engine Start:&nbsp;
                  {todaysSortie.eng_start
                    ? format(new Date(todaysSortie.eng_start), 'HH:mm') 
                    : <input type='button' name='eng_start' value={'Set'} onClick={(e) => {setTime(e)}} />}
                </div>
                <div>
                  Taxi:&nbsp;
                  {todaysSortie.taxi
                    ? format(new Date(todaysSortie.taxi), 'HH:mm') 
                    : <input type='button' name='taxi' value={'Set'} onClick={(e) => {setTime(e)}} />}
                </div>
                <div>
                  Take-Off:&nbsp;
                  {todaysSortie.actual_launch 
                    ? format(new Date(todaysSortie.actual_launch), 'HH:mm')
                    : <input type='button' name='actual_launch' value={'Set'} onClick={(e) => {setTime(e)}} />}
                </div>
                  <EditUpdateLineAction flyer={todaysSortie} updateState={updateState}/>
              </Card>  
            </Grid>
          </Grid>
        </Card>
      </div>
  );
};