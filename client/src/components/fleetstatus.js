import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { aircraft } from '../constants';
import FiveDayForecast from './fivedayforecast';
import { Avatar, Button, Card } from '@mui/material'; 
import { format } from 'date-fns';


export default function ControlledAccordions() {
  const [expanded, setExpanded] = useState(false);
  const [acft, setAcft] = useState(aircraft);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{backgroundColor: '3b3a38'}}>
      {acft.map(tail => (
        <div style={{marginBottom: '5px'}}>
        <Accordion expanded={expanded === tail.tailNumber} onChange={handleChange(tail.tailNumber)} sx={{backgroundColor: 'lightgray', paddingRight: '10px'}}> 
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Avatar alt={tail.tailNumber} src={tail.noseart} sx={{marginRight: '10px', height: '56px', width: '56px'}}/>
            <Card elevation={0} sx={{ width: '25%', flexShrink: 0, backgroundColor: 'lightgray'}}>
              <b>{tail.tailNumber}</b> <br></br> {tail.status} <br></br> <small>{tail.wuc}</small>
            </Card> 
            <Typography sx={{ width: '65%', flexShrink: 0 }}>
              Fuel: {tail.fuel_quantity}k  <br></br>  Parking: {tail.location} <br></br> <small>{tail.discrepancy}</small>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography><b>ETIC:</b> {tail.mx_etic}</Typography>
            <Typography><b>Last Fly:</b> {format(new Date(tail.last_flight), 'Pp')}</Typography>
            <Typography><b>Next Fly:</b> {format(new Date(tail.next_flight), 'Pp')}</Typography>
            <Typography><b>Airframe Hours:</b> {tail.airframe_hrs}</Typography>
            <FiveDayForecast tail={tail}/>
          </AccordionDetails>
        </Accordion>
        </div> 
      ))}
    </div>
  );
}