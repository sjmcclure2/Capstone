import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Checkbox, FormControlLabel, MenuItem, Paper, TextField, Typography, FormControl } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
// import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { BASE_URL } from '../App';

// PASS IN THE {AIRCRAFT.ID} IN LIEU OF SENDING THE TAIL NUMBER

export default function BuildSortie() {
  const [ aircraft, setAircraft ] = useState([]);
  const [ tail, setTail ] = useState();
  const [ launch, setLaunch ] = useState();
  const [ land, setLand ] = useState();
  const [ callsign, setCallsign ] = useState();
  const [ reqFuel, setReqFuel ] = useState();
  const [ isQuickTurn, setIsQuickTurn ] = useState(false);
  const [ sorties, setSorties ] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/aircraft_status`)
    .then(res => res.json())
    .then(data => setAircraft(data))
    }, [sorties])

  const postSortie = () => {
    let tempSortie = 
      {
        'launch_location': tail.location,
        'projected_launch': new Date(launch).toISOString(),
        'projected_land': new Date(land).toISOString(),
        'callsign': callsign,
        'req_fuel': reqFuel,
        'tail_number': tail.tail_number,
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
    setTail(e.target.value)
  }

  const formatDate = (dateToFormat) => {
    return format(new Date(dateToFormat), 'd MMM @ HH:mm');
  }


  return (
    <Box>
      <Paper sx={{margin: '15px', padding: '20px', height: '25%', textAlign: 'center', backgroundColor: '#1A2930', color: 'white'}}>
        <Card sx={{backgroundColor: '#FDFD96',}}>
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
              sx={{margin:'10px', minWidth:'225px'}}
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
              sx={{margin:'10px', minWidth: '225px'}}
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
                color='warning'
                label='Aircraft'
                id={aircraft.id}
                value={aircraft.id}
                onChange={(e) => {updateAircraft(e)}}
                sx={{margin:'10px'}}
              >
                {aircraft.map(acft =><MenuItem id={acft.id} value={acft}>{acft.tail_number}</MenuItem>)}
              
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
          </Card>
      </Paper>
      <Card
        sx={{
          margin: '15px',
          padding: '15px',
          height: '50vh',
          backgroundColor: '#1A2930',
          textAlign: 'center',
          color: 'white'
        }}
      >
        <h2>Sorties Added to Schedule</h2>
        <hr style={{marginBottom: '15px'}}></hr>
        {sorties.map(sortie => 
          <Card
            id={sortie.id}
            sx={{backgroundColor: '#FDFD96', textAlign: 'center', margin: '15px'}} 
          >
            <Typography>Aircraft: {sortie.tail_number}</Typography>
            <Typography>Launch: {formatDate(sortie.projected_launch)}</Typography>
            <Typography>Land: {formatDate(sortie.projected_land)}</Typography>
            <Typography>Callsign: {sortie.callsign}</Typography>
            <Typography>Fuel Load: {sortie.req_fuel}</Typography>
            {sortie.is_quickturn ? <Typography>Quickturn</Typography> : null}
          </Card>
        )}
      </Card>
    </Box>
  )
}