import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Card, Stack } from '@mui/material'; 
import { format } from 'date-fns';
import AircraftInfo from './aircraftinfo';
import UpdateStatus from './modals/updatestatus';
import { BASE_URL } from '../App'

export default function FleetStatus() {
  const [expanded, setExpanded] = useState(false);
  const [acft, setAcft] = useState([]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/aircraft_status`)
    .then(res => res.json())
    .then(data => setAcft(data))
    }, [])
  

  const formatDate = (dateToFormat) => {
    return format(new Date(dateToFormat), 'iii, d MMM')
  }

  return (
    <div 
      style={{
        backgroundColor: '3b3a38'}}
    > 
      {acft.map(tail => (
        <div 
          key={tail.id}
          style={{
            marginBottom: '5px'}}
        >
          <Accordion 
            expanded={expanded === tail.id} 
            onChange={handleChange(tail.id)} 
            sx={{
              backgroundColor: '#1A2930', 
              color: 'white', 
              paddingRight: '10px', 
              paddingTop: '10px'
            }}
          > 
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{color: 'white'}}/>}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Avatar 
                alt={tail.tail_number} 
                // src={tail.noseart} 
                sx={{
                  marginRight: '15px',
                  height: '56px', 
                  width: '56px'}}
              />
              <Card 
                elevation={0} 
                sx={{ 
                  width: '25%', 
                  flexShrink: 0, 
                  backgroundColor: '#1A2930', 
                  color: 'white'}}
              >
                <b>{tail.tail_number}</b> <br/> <b><UpdateStatus status={tail.status}/></b> <br/> <small>{tail.wuc}</small>
              </Card> 
              <Card 
                elevation={0} 
                sx={{ 
                  width: '25%', 
                  flexShrink: 0, 
                  backgroundColor: '#1A2930', 
                  color: 'white'}}
              >
                <Stack 
                  direction="row"
                  alignItems='center'
                >
                  <UpdateStatus fuel={tail.fuel_quant}/>k
                </Stack>
                <Stack 
                  direction="row"
                  alignItems='center'
                >
                  <UpdateStatus location={tail.location}/>
                </Stack>
              </Card>
              <Card 
                elevation={0} 
                sx={{ 
                  width: '25%', 
                  flexShrink: 0, 
                  backgroundColor: '#1A2930', 
                  color: 'white'}}
              >
                {tail.last_sortie ? <Typography><b>Last Fly:</b> {formatDate(tail.last_sortie.actual_land)}</Typography> : null}
                {tail.next_sortie ? <Typography><b>Next Fly:</b> {formatDate(tail.next_sortie.projected_launch)}</Typography> : null}
                <Typography><b>Airframe Hours:</b> {tail.operating_hrs}</Typography><br/>
              </Card>
            </AccordionSummary>
              <AccordionDetails> 
              <Typography 
                variant='h5'
                sx={{
                  textAlign: 'center'}}
              >
                <b>Status Driver</b>
              </Typography>
              <Card 
                elevation={20} 
                sx={{ 
                  width: '100%', 
                  flexShrink: 0, 
                  backgroundColor: '#FDFD96', 
                  color: 'black',
                  padding: '5px',
                }}
              >
                <AircraftInfo tail={tail}/>
              </Card>
            </AccordionDetails>
          </Accordion>
          </div> 
        ))}
    </div>
  );
}