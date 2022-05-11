import React, {useState } from 'react';
import { Card, Grid, Container, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { format, formatISO9075 } from 'date-fns';
import TodayFlyerCard from './todayFlyerCard';
import { BASE_URL } from '../App';
import axios from 'axios';

const dates = [
  {id: '1', day: Date()},
]

function TodaySorties() {

  const [todaysSorties, setTodaysSorties] = useState([]);
  // const [currentDate, setCurrentDate] = useState(``);
  
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
          <TodayFlyerCard flyer={todaysSortie} curDate={date} />
          ))}
        </Card>
      ))}
  </Container>
   )
 }

export default TodaySorties;