import * as React from 'react';
import { Card, Container, Stack, Typography } from '@mui/material';
import { add, format } from 'date-fns';
import CachedIcon from '@mui/icons-material/Cached';

const formatDate = (dateToFormat) => {
  return format(new Date(dateToFormat), 'P')
}

export default function SortieCard (cursortie, curdate) {
  console.log(curdate)
  const [sortie, setSortie] = React.useState({});
  const [date, setDate] = React.useState(curdate)
  setSortie(cursortie)
  
  return (
    sortie.is_quickturn === true ? 
      formatDate(sortie.projected_launch) === formatDate(date.day) ? 
        <div>    
          <Card sx={{textAlign:"center", padding: '10px', backgroundColor: '#FDFD96'}}>
            <Typography>
              <CachedIcon/>
            </Typography> 
            <Typography sx={{fontWeight: 'bold'}}>
              {sortie.callsign}
            </Typography>
            <Typography>
              Tail: {sortie.tail_number}
            </Typography>
            <Typography sx={{color: 'green', fontWeight:'bold'}}>
              {format(new Date(sortie.projected_launch), 'KK:mm')} - {format(new Date(sortie.projected_land), 'KK:mm')}
            </Typography>
          </Card> 
        </div>
      : null  
    : formatDate(sortie.projected_launch) === formatDate(date.day) ? 
        <div>    
          <Card sx={{textAlign:"center", padding: '10px', backgroundColor: '#FDFD96'}}>
            <Typography sx={{fontWeight: 'bold'}}>
              {sortie.callsign}
            </Typography>
            <Typography>
              Tail: {sortie.tail_number}
            </Typography>
            <Typography sx={{color: 'green', fontWeight:'bold'}}>
              {format(new Date(sortie.projected_launch), 'KK:mm')} - {format(new Date(sortie.projected_land), 'KK:mm')}
            </Typography>
          </Card> 
        </div>
    : null
  )
}
