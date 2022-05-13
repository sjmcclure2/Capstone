import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Checkbox, FormControlLabel, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
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
  const sorties = [];

  useEffect(() => {
    fetch(`${BASE_URL}/aircraft_status`)
    .then(res => res.json())
    .then(data => setAircraft(data))
    }, [])

  const postSortie = () => {
    axios.post(`${BASE_URL}/flying_schedule`,
      {
        'projected_launch': launch,
        'projected_land': land,
        'callsign': callsign,
        'req_fuel': reqFuel,
        'tail_number': tailNumber,
        'is_quickturn': isQuickTurn
      }
    )
    sorties.push({
      'projected_launch': launch,
      'projected_land': land,
      'callsign': callsign,
      'req_fuel': reqFuel,
      'tail_number': tailNumber
    })
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
    console.log(e.target.value)
    setTailNumber(e.target.value)
  }

  return (
    <Box>
      <Paper
        sx={{
          margin: '15px',
          padding: '20px',
          height: '15vh'
        }}
      >
          <TextField
            label='Take-Off'
            id='projected_launch'
            name='projected_launch'
            type='datetime-local'
            variant='standard'
            sx={{
              margin:'10px'
            }}
          />
          <TextField
            label='Land'
            id='projected_land'
            name='projected_land'
            type='datetime-local'
            variant='standard'
            sx={{
              margin:'10px'
            }}
          />
          <TextField
            label='Callsign'
            id='callsign'
            name='callsign'
            type='callsign'
            variant='standard'
            sx={{
              margin:'10px'
            }}
          />
          <TextField
            label='Fuel Load'
            id='req_fule'
            name='req_fuel'
            variant='standard'
            sx={{
              margin:'10px'
            }}
          />
           <Select
            labelId='tail_number'
            id={aircraft.id}
            value={aircraft.id}
            label='Aircraft'
            onChange={(e) => {updateAircraft(e)}}
            sx={{
              margin:'10px'
            }}
          >
            {aircraft.map(acft => 
              <MenuItem value={acft.tail_number}>{acft.tail_number}</MenuItem>
            )}
          </Select>
          <FormControlLabel
            label='Quickturn'
            sx={{
              paddingBottom: '20px', 
              margin: '15px'
            }}
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
            onClick={postSortie}
            >Add Sortie</Button>
      </Paper>
      <Card
        sx={{
          margin: '15px',
          padding: '15px',
          height: '50vh'
        }}
      >
        {sorties.map(sortie => 
          <Typography>{sortie.projected_land}</Typography>  
        )}
      </Card>
    </Box>
  )
}