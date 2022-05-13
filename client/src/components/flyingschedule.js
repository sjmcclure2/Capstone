import React, { useEffect, useState } from 'react';
import { Card, Stack } from '@mui/material';
import { addDays, format } from 'date-fns';

import { BASE_URL } from '../App';
import SortieCard from './sortieCard';
// import UsePagination from './sortiepagination';

export default function FlyingSchedule () {

  const [numDays ] = useState(7);
  const [days, setDays ] = useState([ Date() ]);
  const [sorties, setSorties ] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  function next() {
    setPage(page => Math.min(page + 1, limit));
  }

  function prev() {
    setPage(page => Math.max(page - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setPage(page => Math.min(pageNumber, limit));
  }

  const count = Math.ceil(sorties.length / limit)

  useEffect(() => {
    const days = [];
    for (let i = 0; i < numDays; i++) {
      days.push(addDays(Date.now(), i));
    };
    setDays(days);
  }, [numDays])

  useEffect(() => {
    fetch(`${BASE_URL}/flying_schedule`)
    .then(res => res.json())
    .then(data => setSorties(data))
  }, []);

  return <>
    {days.map(day => ( 
      <Card key={day} sx={{textAlign: 'center', margin: '10px', padding: '10px',backgroundColor: '#1A2930'}}>  
        <h3 style={{color:'white'}}>{format(new Date(day), 'PPPP')}</h3>
        <Stack direction="row" spacing={2} sx={{justifyContent:"center"}}>
          {sorties.filter(sortie => format(new Date(sortie.projected_launch), 'P') === format(day, 'P'))
          .map(sortie => <SortieCard key={sortie.id} sortie={sortie} />)}
        </Stack>
      </Card>
    ))}
  </>;
};
