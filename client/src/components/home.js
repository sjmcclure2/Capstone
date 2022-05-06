import * as React from 'react';
import { Box } from '@mui/material';
import TodaySorties from './todaysorties';
import { ACInfo } from '../constants';
import FleetStatus from './fleetstatus'


function Home () {
  const [fliers, setFliers] = React.useState(ACInfo)
  return(
    <Box>
      <FleetStatus/>
     {/* <TodaySorties aircraft={fliers} /> */}
   </Box>
  )
}

export default Home;