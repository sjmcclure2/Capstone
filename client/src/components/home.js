import * as React from 'react';
import { Box } from '@mui/material';
import AirCraftCard from './aircraftcard';
import { ACInfo } from '../constants';



function Home () {
  const [fliers, setFliers] = React.useState(ACInfo)
  return(
    <Box>
     <AirCraftCard aircraft={fliers}/>
   </Box>
  )
}
export default Home;
