import React, {useState } from 'react';
import { Card, Container } from '@mui/material';
import { format } from 'date-fns';

import { BASE_URL } from '../App';
import TodayFlyerCard from './todayFlyerCard';

function TodaySorties() {

  const [ todaysSorties, setTodaysSorties ] = useState([]);
  
  React.useEffect(() => {
    fetch(`${BASE_URL}/flying_schedule`)
      .then(res => res.json())
      .then(data => setTodaysSorties(data))
  }, [])

  const date = Date();

  return (
  <Container>  
    <Card sx={{textAlign: 'center', margin: '10px', padding: '10px',backgroundColor: '#1A2930'}}>  
      <h3 style={{color:'white'}}>{format(new Date(date), 'PPPP')}</h3>  
      {todaysSorties
      .filter(sortie => format(new Date(sortie.projected_launch), 'P') === format(new Date(date), 'P'))
      .map(sortie =>  
      <TodayFlyerCard key={sortie.id} flyer={sortie} curDate={date} />
      )}
    </Card>
  </Container>
   )
 }

export default TodaySorties;