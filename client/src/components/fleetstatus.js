import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card } from '@mui/material'; 
import { format } from 'date-fns';
import AircraftInfo from './aircraftinfo';
import { BASE_URL } from '../App'
import AircraftInfoCard from './aircraftinfocard';

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
            }}
          > 
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{color: 'white'}}/>}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >

              <AircraftInfoCard tail={tail}/>

            </AccordionSummary>
              <AccordionDetails> 
              <Typography 
                variant='h5'
                sx={{
                  textAlign: 'center',
                  color: 'white'
                }}
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