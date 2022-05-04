import * as React from 'react';
import { Box, Card } from '@mui/material';
import AirCraftCard from './aircraftcard';
import FlyingSchedule from './flyingschedule';


const ACInfo = [
  {
    "tail_number": 850045,
    "fuel_quantity": 85,
    "status": "FMC",
    "projected_launch": "2022-05-04T12:15:00.000Z",
    "actual_launch": "2022-05-04T12:35:00.000Z",
    "projected_land": "2022-05-04T18:30:00.000Z",
    "actual_land": null,
    "sortie_id": 102,
    "call_sign": "Death 1",
    "crew_ready": "2022-05-04T10:30:00.000Z",
    "crew_show": "2022-05-04T11:00:00.000Z",
    "eng_start": "2022-05-04T11:15:00.000Z",
    "taxi": "2022-05-04T12:30:00.000Z",
    "req_fuel": 160,
    "launch_location": "HS 2",
    "parking_location": "HS 8"
  },
  {
    "tail_number": 850129,
    "fuel_quantity": 40,
    "status": "PMC",
    "projected_launch": "2022-05-04T12:15:00.000Z",
    "actual_launch": "2022-05-04T12:00:00.000Z",
    "projected_land": "2022-05-04T18:30:00.000Z",
    "actual_land": "2022-05-04T13:45:00.000Z",
    "sortie_id": 102,
    "call_sign": "Death 1",
    "crew_ready": "2022-05-04T10:30:00.000Z",
    "crew_show": "2022-05-04T11:00:00.000Z",
    "eng_start": "2022-05-04T11:30:00.000Z",
    "taxi": "2022-05-04T11:45:00.000Z",
    "req_fuel": 160,
    "launch_location": "D 9",
    "parking_location": "D 12"
  },
  {
    "tail_number": 850397,
    "fuel_quantity": 226,
    "status": "PMC",
    "projected_launch": "2022-05-04T12:15:00.000Z",
    "actual_launch": null,
    "projected_land": "2022-05-04T18:30:00.000Z",
    "actual_land": null,
    "sortie_id": 102,
    "call_sign": "Death 1",
    "crew_ready": "2022-05-04T11:30:00.000Z",
    "crew_show": null,
    "eng_start": null,
    "taxi": null,
    "req_fuel": 220,
    "launch_location": "D 6",
    "parking_location": "D 9"
  }

]
function Home () {
  const [fliers, setFliers] = React.useState(ACInfo)


  return(
    <Box>
      <AirCraftCard aircraft={fliers}/>
    </Box>
  )
}
export default Home;

