import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Button, Card, Grid } from '@mui/material'; 
import { format } from 'date-fns';
import AircraftInfo from './aircraftinfo';
import { aircraft, locations, sorties } from '../mockData';
import { Link } from 'react-router-dom';
import AircraftInfoCard from './aircraftinfocard';

export default function FleetStatus() {
  const [expanded, setExpanded] = useState(false);
  const [acft, setAcft] = useState(aircraft);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div 
      style={{
        backgroundColor: '3b3a38'}}
    > 
      {acft.map(tail => (
        <div 
          style={{
            marginBottom: '5px'}}
        >
          <Accordion 
            expanded={expanded === tail.id} 
            onChange={handleChange(tail.id)} 
            sx={{
              backgroundColor: '#1A2930', 
              color: 'white', 
              paddingRight: '10px'
            }}
          > 
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{color: 'white'}}/>}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Avatar 
                alt={tail.id} 
                src={tail.noseart} 
                sx={{
                  marginRight: '10px', 
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
                <b>{tail.id}</b> <br></br> {tail.status} <br></br> <small>{tail.wuc}</small>
              </Card> 
              <Typography 
                sx={{ 
                  width: '65%', 
                  flexShrink: 0 }}
              >
                Fuel: {tail.fuel_quant}k  <br></br>  Parking: {tail.location} <br></br> <small>{tail.discrepancy}</small>
              </Typography>
            </AccordionSummary>
            <AccordionDetails> 
              <Typography><b>Last Fly:</b> {format(new Date(tail.last_flight), 'Pp')}</Typography>
              <Typography><b>Next Fly:</b> {format(new Date(tail.next_flight), 'Pp')}</Typography>
              <Typography><b>Airframe Hours:</b> {tail.operating_hrs}</Typography><br/>
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
                  backgroundColor: '#ded9cc', 
                  color: 'black',
                  padding: '5px',
                }}
              >
                <AircraftInfoCard tail={tail}/>
                <AircraftInfo tail={tail}/>
              </Card>
            </AccordionDetails>
          </Accordion>
          </div> 
        ))}
    </div>
  );
}