import React, { useState, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Card, Typography } from '@mui/material'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { BASE_URL } from '../App'
import AircraftStatus from './AircraftStatus';
import StatusDriver from './StatusDriver';

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

  return (
    <div style={{backgroundColor: '3b3a38'}}> 
      {acft.map((tail, index) => (
        <div key={tail.id} style={{marginBottom: '5px'}}>
          <AircraftStatus tail={tail} index={index}/> 
          <Accordion 
            expanded={expanded === tail.id} 
            onChange={handleChange(tail.id)} 
            sx={{backgroundColor: '#1A2930'}}> 
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{color: 'white'}}/>}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{paddingLeft: '45%'}}>
              <Typography variant='h6' sx={{color: 'orange', textAlign: 'center'}}>
                <b>Status Driver</b>
              </Typography>
            </AccordionSummary>
              <AccordionDetails> 
              <Card elevation={20} sx={{width: '100%', flexShrink: 0, backgroundColor: '#FDFD96', color: 'black', padding: '5px'}}>
                <StatusDriver tail={tail}/> 
              </Card>
            </AccordionDetails>
          </Accordion>
          </div> 
        ))}
    </div>
  );
}