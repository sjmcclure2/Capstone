import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { Card, Container, Grid, Stack, Typography } from '@mui/material';


const aircraft = [
  {
    tailNumber: '50-0080',
    status:'PMC',
    mx_etic: '12 May @ 1330',
    symbol: '/',
    discrepancy: '',
    wuc: '13BAG',
    shop: '',
    last_flight: '1 May @ 0750',
    next_flight: '6 May @ 1220',
    fuel_quantity: '190',
    location: 'B1'
  },
  {
    tailNumber: '60-0140',
    status:'NMCBB',
    mx_etic: '',
    symbol: 'X',
    discrepancy: 'A thing is broke',
    wuc: '12ABB',
    shop: 'APG',
    last_flight: '4 May @ 0700',
    next_flight: '7 May @ 1040',
    fuel_quantity: '130',
    location: '2BN'
  },
  {
    tailNumber: '60-3565',
    status:'PMCMC',
    mx_etic: '4 May @ 1930',
    symbol: '/',
    discrepancy: 'A thing is kinda broke',
    wuc: '04199',
    shop: 'Sheet Metal',
    last_flight: '2 May @ 0300',
    next_flight: '5 May @ 1430',
    fuel_quantity: '185',
    location: 'O1'
  },
  {
    tailNumber: '59-0001',
    status:'FMC',
    mx_etic: '',
    symbol: '',
    discrepancy: '',
    wuc: '',
    shop: '',
    last_flight: '28 Mar @ 0745',
    next_flight: '5 May @ 0900',
    fuel_quantity: '195',
    location: 'Q2'
  },
];

export default function FleetStatus() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = aircraft.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const populateAcft = () => {
    return(
      <Box sx={{maxWidth: 400, flexGrow: 1, textAlign: 'center'}}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
          }}
        >
          <Typography variant='h4'>{aircraft[activeStep].tailNumber} | {aircraft[activeStep].status}</Typography>
        </Paper>
        {/* <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        > */}
          {aircraft.map((step, index) => (
            <div key={step.tailNumber}>
              {Math.abs(activeStep - index) <= 2 ? (
                  <Card
                    elevation={12} 
                  >
                    <Grid container>
                      <Grid item sm={6} xs={6} >
                        <Card>Location {step.location} <br></br> Fuel {step.fuel_quantity}K</Card>
                      </Grid>
                        <Grid item sm={6} xs={6}>
                          <Card> ETIC: <br></br> {step.mx_etic != '' ? `${step.mx_etic}` : `${step.status}`}</Card> 
                        </Grid> 
                      <Grid item sm={6} xs={6}>
                        <Card>Last Fly {step.last_flight}</Card>
                      </Grid>
                      <Grid item sm={6} xs={6}>
                        <Card>Next Fly {step.next_flight}</Card>
                      </Grid>       
                    </Grid>
                  </Card>
              ) : null}
              
            </div>
          ))}
        {/* </SwipeableViews> */}
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    )
  }

  return <Container>
    <Stack>
      {populateAcft()}
    </Stack>
  </Container>
}