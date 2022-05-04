import * as React from 'react';
import { Card, Grid } from '@mui/material';

function locationFinder({ plane }) {
  console.log(plane)
  if(plane.actual_launch == null) {
    return (`Location: ${plane.launch_location}`)
  } else if(plane.actual_land == null) {
    return (`Location: Flying`)
  } else {
    return (`Locaation: ${plane.land_location}`)
  }
    

}

function AirCraftCard({ aircraft }) {
  let planes = aircraft
  const results = planes.map((plane)=>{
    let crewStatus = false;
    return(
      <Card>
        <Grid container spacing={1} columns={10} rowSpacing={1}>
          <Grid item xs={2}>
            <Card>AC: {plane.tail_number}</Card>
          </Grid>
          <Grid item xs={2}>
            <Card>{plane.actual_launch != null ? `Actual: ${plane.actual_launch}` : `Sched: ${plane.projected_launch}`}</Card>
          </Grid>
          <Grid item xs={2}>
            <Card> {plane.crew_show != null ? `Crew Show: ${plane.crew_show}` : `Crew Rdy: ${plane.crew_ready}` }</Card>
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
            <Card>{plane.actual_land != null ? `Actual: ${plane.actual_land}` : `Sched: ${plane.projected_land}`}</Card>
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
      </Card>
    )
  })

  return (
    <>
    {results}
    </>
  
  )
}

export default AirCraftCard