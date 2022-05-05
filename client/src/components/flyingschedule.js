import * as React from 'react';
import { Box, Card, Paper, Stack, Divider, Typography } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import { ACInfo } from '../constants';
import { add, format } from 'date-fns'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
    <div>
      {dates.map(date => ( 
        <Card sx={{
          textAlign: 'center', 
          margin: '10px', 
          paddingBottom: '10px', 
          paddingLeft: '10px',
          backgroundColor: 'lightgray'}}
        >  
          <h3>{format(new Date(date.day), 'PPPP')}</h3>  
            <Stack
              direction="row"
              spacing={2}
              sx={{justifyContent:"center"}}
            >
              {sorties.map(schedules => (
                format(new Date(schedules.projected_launch), 'P') === format(new Date(date.day), 'P') ?       
                    <Card sx={{textAlign:"center",padding: '5px'}}><br/>
                      {schedules.call_sign}<br/>
                      {format(new Date(schedules.projected_launch), 'km')} - {format(new Date(schedules.projected_land), 'km')}<br/>
                      {schedules.tail_number}
                    </Card> 
                  :null
              ))}
            </Stack>
        </Card>
      ))}
    </div>  
  )
}

export default FlyingSchedule;