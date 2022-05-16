import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Checkbox, FormControlLabel, MenuItem, Paper, TextField, Typography, FormControl } from '@mui/material';
import axios from 'axios';
// import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { BASE_URL } from '../App';

// PASS IN THE {AIRCRAFT.ID} IN LIEU OF SENDING THE TAIL NUMBER

export default function BuildSortie() {
  const [aircraft, setAircraft] = useState([]);
  const [tailNumber, setTailNumber] = useState();
  const [launch, setLaunch] = useState();
  const [land, setLand] = useState();
  const [callsign, setCallsign] = useState();
  const [reqFuel, setReqFuel] = useState();
  const [isQuickTurn, setIsQuickTurn] = useState(false);
  const [sorties, setSorties] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/aircraft_status`)
    .then(res => res.json())
    .then(data => setAircraft(data))
    }, [sorties])

  const postSortie = () => {
    let tempSortie = 
      {
        'projected_launch': launch,
        'projected_land': land,
        'callsign': callsign,
        'req_fuel': reqFuel,
        'tail_number': tailNumber,
        'is_quickturn': isQuickTurn
      };
    axios.post(`${BASE_URL}/flying_schedule`, tempSortie);
    
    setSorties([...sorties, tempSortie])
  }

  const updateLaunch = (e) => {
    setLaunch(e.target.value)
  };

  const updateLand = (e) => {
    setLand(e.target.value)
  };

  const updateCallsign = (e) => {
    setCallsign(e.target.value)
  };

  const updateReqFuel = (e) => {
    setReqFuel(e.target.value)
  }

  const updateQuickTurn = () => {
    setIsQuickTurn(!isQuickTurn)
  };

  const updateAircraft = (e) => {
    setTailNumber(e.target.value)
  }

  return (
    <Box>
      <Paper sx={{margin: '15px', padding: '20px', height: '25%', textAlign: 'center', backgroundColor: '#c9cdd4'}}>
        <h3> New </h3>
        <hr style={{marginBottom: '15px'}}></hr>
          <TextField
            label='Take-Off'
            id='projected_launch'
            name='projected_launch'
            type='datetime-local'
            variant='outlined'
            color='warning'
            InputLabelProps={{ shrink: true }}
            onChange={(e) => {updateLaunch(e)}}
            sx={{margin:'10px'}}
          />
          <TextField
            label='Land'
            id='projected_land'
            name='projected_land'
            type='datetime-local'
            variant='outlined'
            color='warning'
            InputLabelProps={{ shrink: true }}
            onChange={(e) => {updateLand(e)}}
            sx={{margin:'10px'}}
          />
          <TextField
            label='Callsign'
            id='callsign'
            name='callsign'
            type='callsign'
            variant='outlined'
            color='warning'
            onChange={(e) => {updateCallsign(e)}}
            sx={{margin:'10px'}}
          />
          <TextField
            label='Fuel Load'
            type='number'
            id='req_fule'
            name='req_fuel'
            variant='outlined'
            color='warning'
            onChange={(e) => {updateReqFuel(e)}}
            sx={{margin:'10px'}} 
          />
          <FormControl sx={{minWidth: 160}}>
            <TextField
              select
              label='Aircraft'
              id={aircraft.id}
              value={aircraft.id}
              onChange={(e) => {updateAircraft(e)}}
              sx={{margin:'10px'}}
            >
              {aircraft.map(acft =><MenuItem value={acft.tail_number}>{acft.tail_number}</MenuItem>)}
             
            </TextField>
          </FormControl>
          <FormControlLabel
            label='Quickturn'
            sx={{paddingBottom: '20px', margin: '15px'}}
            control={
              <Checkbox
                id='quickturn'
                label='Quickturn'
                onChange={updateQuickTurn}
              />
            }
          />
          <Button 
            variant='text'
            size='large'
            onClick={postSortie}
            color='success'
            sx={{marginLeft: '20px', paddingBottom: ' 20px'}}  
          >
              Add Sortie
          </Button>
      </Paper>
      <Card
        sx={{
          margin: '15px',
          padding: '15px',
          height: '50vh',
          backgroundColor: '#c9cdd4',
          textAlign: 'center'
        }}
      >
        <h2>Sorties Added to Schedule</h2>
        <hr style={{marginBottom: '15px'}}></hr>
        {sorties.map(sortie => 
          <Card
           sx={{backgroundColor: '#FDFD96', textAlign: 'center', margin: '15px'}} 
          >
            <Typography>Aircraft: {sortie.tail_number}</Typography>
            <Typography>Launch: {sortie.projected_launch}</Typography>
            <Typography>Land: {sortie.projected_land}</Typography>
            <Typography>Callsign: {sortie.callsign}</Typography>
            <Typography>Fuel Load: {sortie.req_fuel}</Typography>
            {sortie.is_quickturn ? <Typography>Quickturn</Typography> : null}
          </Card>
        )}
      </Card>
    </Box>
  )
}