import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { format, isSameDay } from 'date-fns';

import { BASE_URL } from '../App';
import TodayFlyerCard from './TodayFlyerCard';

export default function TodaySorties() {

  const [ todaysSorties, setTodaysSorties ] = useState([]);
  const [ locations, setLocations ] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/flying_schedule`)
      .then(res => res.json())
      .then(data => setTodaysSorties(data));
    fetch(`${BASE_URL}/locations`)
      .then(res => res.json())
      .then(data => setLocations(data));
  }, []);


  const today = new Date();

  return <Card sx={{textAlign: 'center', margin: '10px', padding: '10px',backgroundColor: '#1A2930'}}>  
    <h3 style={{color:'white'}}>{format(today, 'PPPP')}</h3>  
    {todaysSorties
    .filter(sortie => isSameDay(new Date(sortie.projected_launch), today))
    .map(sortie =>  
    <TodayFlyerCard key={sortie.id} flyer={sortie} locations={locations}/>
    )}
  </Card>
 };
