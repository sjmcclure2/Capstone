import * as React from 'react';
import { Card, Container, Stack, Typography } from '@mui/material';
import { add, format } from 'date-fns';
import CachedIcon from '@mui/icons-material/Cached';
import { BASE_URL } from '../App'
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
              {sorties.map(sortie => (
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
                :null  
              :
                  formatDate(sortie.projected_launch) === formatDate(date.day) ? 
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
              ))}
            </Stack>
        </Card>
      ))}
    </Container>
  )
}

export default FlyingSchedule;