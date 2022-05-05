import * as React from 'react';
import { Box, Card, Container, Paper, Stack, Divider, Typography } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import { ACInfo } from '../constants';
import { add, format } from 'date-fns'

const dates = [
  {id: '1', day: Date()},
  {id: '2', day: add(new Date(), {days: 1})},
  {id: '3', day: add(new Date(), {days: 2})},
  {id: '4', day: add(new Date(), {days: 3})},
  {id: '5', day: add(new Date(), {days: 4})},
]

function FlyingSchedule () {
  const [sorties, setSorties] = React.useState(ACInfo)

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
              {sorties.map(schedules => (
                format(new Date(schedules.projected_launch), 'P') === format(new Date(date.day), 'P') ? 
                  <div> 
                    <div>    
                      <Card sx={{textAlign:"center", padding: '5px', backgroundColor: '#FDFD96'}}>
                        {schedules.call_sign}<br/>
                        {format(new Date(schedules.projected_launch), 'km')}-{format(new Date(schedules.projected_land), 'km')}<br/>
                        {schedules.tail_number}
                      </Card> 
                    </div>
                    {sorties.indexOf(schedules.tail_number) > 1 ? 
                      <div>
                        <Card sx={{textAlign:"center", marginTop: '5px', padding: '5px', backgroundColor: '#F2CE3E'}}>
                          New Card
                        </Card>
                      </div>
                    : null
                    }
                  </div> 
                :null
              ))}
            </Stack>
        </Card>
      ))}
    </Container>  
  )
}

export default FlyingSchedule;