import React, {useState, useEffect } from 'react';
import { Card, Grid, Container } from '@mui/material';
import Button from '@mui/material/Button';
import AircraftModal from './aircraftmodal';
import { ACInfo } from '../constants';


function locationFinder(plane) {
  if(plane.actual_launch == null) {
    return (`Location: ${plane.launch_location}`)
  } else if(plane.actual_land == null) {
    return (`Location: Flying`)
  } else {
    return (`Location: ${plane.parking_location}`)
  }
}

function TodaySorties() {
  const[aircraft, setAircracft] = useState(ACInfo);
  const[sorties, setSorties] = useState();
  
  const results = aircraft.map((plane)=>{
    if(plane.eng_start != null && plane.eng_start.length > 8) {
      plane.eng_start = plane.eng_start.slice(11,19)
      console.log(plane.eng_start)
    }
    return(
      <Container style={{
        minHeight: "10vh",
        backgroundColor: "grey",
        pageBreakAfter: "auto",
        fontSize: "1.4vh",
        marginTop: "1vh",
        padding: "1vh",
        textAlign: "center",
        borderRadius: "5px",
        minWidth: "15vw",
      }} >
        <Grid container spacing={1} columns={10} rowSpacing={1}>
          <Grid item xs={2}>
            <Card>AC: {plane.tail_number}</Card>
          </Grid>
          <Grid item xs={2}>
            <Card>{plane.actual_launch != null ? `Actual TO: ${plane.actual_launch.slice(11,16)}` : `Sched TO: ${plane.projected_launch.slice(11,16)}`}</Card>
          </Grid>
          <Grid item xs={2}>
            <Card> {plane.crew_show != null ? `Crew Show: ${plane.crew_show.slice(11,16)}` : `Crew Rdy: ${plane.crew_ready.slice(11,16)}` }</Card>
          </Grid>
          <Grid item xs={2}>
            <Card>{plane.crew_show != null ? `Eng Start: ${plane.eng_start}`: `Crew Show: ${plane.crew_show}`}</Card>
          </Grid>
          <Grid item xs={2}>
            <Card>Fuel: {plane.fuel_quantity}k</Card>
          </Grid>
          <Grid item xs={2}>
            <Card>{plane.call_sign}</Card>
          </Grid>
          <Grid item xs={2}>
            <Card>{plane.actual_land != null ? `Actual Land: ${plane.actual_land.slice(11,16)}` : `Sched Land: ${plane.projected_land.slice(11,16)}`}</Card>
          </Grid>
          <Grid item xs={2}>
            <Card>Sortie: {plane.sortie_id}</Card>
          </Grid>
          <Grid item xs={2}>
            <Card>{locationFinder(plane)}</Card>
          </Grid>
          <Grid item xs={2}>
            <Card>Target: {plane.req_fuel}k</Card>
          </Grid>
        </Grid>
        <AircraftModal/>
      </Container>
    )
    })

  return (
    <>
    {results}
    </>
  
  )
}

export default TodaySorties