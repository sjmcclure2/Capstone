import * as React from 'react';
import { Card, Container, Stack, Typography } from '@mui/material';
import { add, format } from 'date-fns';
import CachedIcon from '@mui/icons-material/Cached';
import { BASE_URL } from '../App';
import SortieCard from './sortieCard'

const dates = [
  {id: '1', day: Date()},
  {id: '2', day: add(new Date(), {days: 1})},
  {id: '3', day: add(new Date(), {days: 2})},
  {id: '4', day: add(new Date(), {days: 3})},
  {id: '5', day: add(new Date(), {days: 4})},
]

function FlyingSchedule () {
  const [sorties, setSorties] = React.useState([])

  React.useEffect(() => {
    fetch(`${BASE_URL}/flying_schedule`)
    .then(res => res.json())
    .then(data => setSorties(data))
  }, [])

  const formatDate = (dateToFormat) => {
    return format(new Date(dateToFormat), 'P')
  }

return(
  <Container>
    {dates.map(date => ( 
      <Card sx={{
        textAlign: 'center', 
        margin: '10px', 
        padding: '10px',
        backgroundColor: '#1A2930'}}
      >  
        <h3 style={{color:'white'}}>{format(new Date(date.day), 'PPPP')}</h3>  
        <Stack
          direction="row"
          spacing={2}
          sx={{justifyContent:"center"}}
        >
          {sorties.map(sortie => <SortieCard cursortie={sortie} curdate={date} />)}
          </Stack>
        </Card>
      ))}
    </Container>
  )
}

export default FlyingSchedule;