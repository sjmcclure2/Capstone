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
    // <Grid container spacing={2}>
      <Card key={day} sx={{textAlign: 'center', margin: '10px', padding: '10px',backgroundColor: '#1A2930'}}>  
        <h3 style={{color:'white'}}>{format(new Date(day), 'PPPP')}</h3>
        <Stack direction="row" spacing={2} sx={{justifyContent:"center"}}>
          {sorties.filter(sortie => format(new Date(sortie.projected_launch), 'P') === format(day, 'P'))
          .map(sortie => <SortieCard key={sortie.id} sortie={sortie} />)}
        </Stack>
      </Card>
    // </Grid>
      ))}
  </>;
};

// import React, { useState } from "react";
// import { Grid, Card, Typography, Pagination } from '@mui/material';
// import CachedIcon from '@mui/icons-material/Cached';
// import { format } from 'date-fns';
// import UsePagination from './sortiepagination';

// export default function FlyingSchedule() {

// const [numDays ] = useState(7);
// const [days, setDays ] = useState([ Date() ]);
// const [sorties, setSorties ] = useState([]);

// useEffect(() => {
//   const days = [];
//   for (let i = 0; i < numDays; i++) {
//     days.push(addDays(Date.now(), i));
//   };
//   setDays(days);
// }, [numDays])

// useEffect(() => {
//   fetch(`${BASE_URL}/flying_schedule`)
//   .then(res => res.json())
//   .then(data => setSorties(data))
// }, []);

// let [page, setPage] = useState(1);
// const PER_PAGE = 5;
  
// const count = Math.ceil(sortie.length / PER_PAGE);
// const _DATA = usePagination(sortie, PER_PAGE);

// const handleChange = (e, p) => {
//   setPage(p);
//   _DATA.jump(p);
// };
  
// return <>
//  {days.map(day => ( 
//    <Card key={day} sx={{textAlign: 'center', margin: '10px', padding: '10px',backgroundColor: '#1A2930'}}>  
//      <h3 style={{color:'white'}}>{format(new Date(day), 'PPPP')}</h3>
//        <Stack direction="row" spacing={2} sx={{justifyContent:"center"}}>
//          {sorties.filter(sortie => format(new Date(sortie.projected_launch), 'P') === format(day, 'P'))
//          .map(sortie => <SortieCard key={sortie.id} sortie={sortie} />)}
//        </Stack>
//      <Pagination count={count} page={page} color="primary" onChange={handleChange}/>
//    </Card>
//    ))}
//  </>;
// };