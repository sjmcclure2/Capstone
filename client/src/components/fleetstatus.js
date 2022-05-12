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
    status:'FMC',
    mx_etic: '',
    symbol: '',
    discrepancy: '',
    wuc: '',
    shop: '',
    last_flight: '22110',
    next_flight: '22125',
    fuel_quantity: '190',
    location: 'B1'
  },
  {
    tailNumber: '60-0140',
    status:'NMCBB',
    mx_etic: 'Parts + 5',
    symbol: 'X',
    discrepancy: 'A thing is broke',
    wuc: '12ABB',
    shop: 'APG',
    last_flight: '22034',
    next_flight: '22122',
    fuel_quantity: '130',
    location: '2BN'
  },
  {
    tailNumber: '60-3565',
    status:'PMCMC',
    mx_etic: '2',
    symbol: '/',
    discrepancy: 'A thing is kinda broke',
    wuc: '04199',
    shop: 'Sheet Metal',
    last_flight: '22015',
    next_flight: '22114',
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
    last_flight: '22112',
    next_flight: '22126',
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

  return <Container>
    <Stack>
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
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {aircraft.map((step, index) => (
            <div key={step.tailNumber}>
              {Math.abs(activeStep - index) <= 2 ? (
                  <Card
                    elevation={12} 
                  >
                    <Grid container>
                      <Grid item sm={6} xs={6}>
                        <Card>Loc: {step.location} <br></br> Fuel: {step.fuel_quantity}</Card>
                      </Grid>
                      <Grid item sm={12}>
                        <Card>{step.mx_etic != '' ? `ETIC: ${step.mx_etic}` : null}</Card> 
                      </Grid>
                      <Grid item sm={12}>
                        <Card>{step.symbol}</Card>
                      </Grid>
                      <Grid item sm={12}>
                        <Card>Status Driver: {step.discrepancy}</Card>
                      </Grid>
                      <Grid item sm={12}>
                        <Card>{step.wuc}</Card>
                      </Grid>
                      <Grid item sm={12}>
                        <Card>{step.shop}</Card>
                      </Grid>
                      <Grid item sm={12}>
                        <Card>{step.last_flight}</Card>
                      </Grid>
                      <Grid item sm={12}>
                        <Card>{step.next_flight}</Card>
                      </Grid>
                      
                    </Grid>
                  </Card>
              ) : null}
              
            </div>
          ))}
        </SwipeableViews>
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
    </Stack>
  </Container>
}