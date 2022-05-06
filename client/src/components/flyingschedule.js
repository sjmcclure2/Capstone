import * as React from 'react';
import { Card, Container, Paper, Stack } from '@mui/material';
import { ACInfo } from '../constants';
import { add, format } from 'date-fns';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const dates = [
  {id: '1', day: Date()},
  {id: '2', day: add(new Date(), {days: 1})},
  {id: '3', day: add(new Date(), {days: 2})},
  {id: '4', day: add(new Date(), {days: 3})},
  {id: '5', day: add(new Date(), {days: 4})},
]

function FlyingSchedule () {
  const [sorties, setSorties] = React.useState(ACInfo)
  const [daily, setDaily] = React.useState([]);

      /*  
      1. Sort through the sorties array to match sorties with dates. 
      2. Identify any duplicate tail numbers for that day of flying.
      3. Rearrange the array so the quick turn is directly after its first flight.
      4. Use that array to map the output. 

      * Multi-dimensional array...
        1. Run through the sorties state for each day
        2. 
      */
  // const dailyFlying = (date, sortie) => {
  //   let tempState = [];
  //   dates.map(date => {
  //     sorties.map(sortie => {
  //       if(format(new Date(sortie.projected_launch), 'P') === format(new Date(date.day), 'P')) {
  //         tempState.push[sortie.tail_number]
          
  //       }
  //     })
  //   })
  //   console.log(tempState)
  //   return tempState;
  // }
  
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
                
                  format(new Date(sortie.projected_launch), 'P') === format(new Date(date.day), 'P') ? 
                    <div>    
                      <Card sx={{textAlign:"center", padding: '5px', backgroundColor: '#FDFD96'}}>
                        {sortie.call_sign}<br/>
                        {format(new Date(sortie.projected_launch), 'km')}-{format(new Date(sortie.projected_land), 'km')}<br/>
                        {sortie.tail_number}
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