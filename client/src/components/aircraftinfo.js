import { Card, Container } from '@mui/material';
import React, { useState } from 'react';

export default function AircraftInfo(props) {
  const [mxActions, setMxActions] = useState();
  const [notes, setNotes] = useState();
  const aircraft = props.tail;

  return(
    <Container>
      <Card
        sx={{
          maxHeight: '200px'
        }}
      >
        {aircraft.tailNumber}
      </Card>
    </Container>
  )
}