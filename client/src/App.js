import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { AppBar as MuiAppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem,
  ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Airlines as AirlinesIcon, CalendarViewMonth as CalendarViewMonthIcon,
  ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon,
  ConnectingAirports as ConnectingAirportsIcon, Engineering as EngineeringIcon,
  Menu as MenuIcon, NotificationImportant as NotificationImportantIcon } from '@mui/icons-material';

import Clock from './components/Clock';
import FleetStatus from './components/FleetStatus';
import Flyingschedule from './components/FlyingSchedule';
import ScheduledMx from './components/ScheduledMx';
import TodaySorties from './components/TodaySorties';
import BuildSortie from './components/BuildSortie';

export const BASE_URL = {
  development: 'http://localhost:8080/api',
  production: 'https://af-salt-api.herokuapp.com/api'
}[process.env.NODE_ENV];

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [ open, setOpen ] = React.useState(false);
  const icons = [
    <AirlinesIcon sx={{color: "#FDFD96"}}/>, 
    <EngineeringIcon sx={{color: "#FDFD96"}}/>, 
    <ConnectingAirportsIcon sx={{color: "#FDFD96"}}/>, 
    <CalendarViewMonthIcon sx={{color: "#FDFD96"}}/>, 
    <NotificationImportantIcon sx={{color: "#FDFD96"}}/>
  ];
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{ 
        display: 'flex', 
        height: '100vh',
        width: '100vw', 
        paddingBottom: '15px',
        margin: '0'
      }}
    >
      <CssBaseline />
      <AppBar 
        position="fixed" 
        open={false}
      >
        <Toolbar
          sx={{
            backgroundColor: '#1A2930',
            justifyContent: 'space-between',
            fontSize: 'min(2vmin, 1em)'
          }}
        >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
              <Typography 
                component="div"
                variant="h6" 
                noWrap
                sx={{
                  margin: '0 0.5em'
                }}
                >
                {decodeURI(window.location.pathname.slice(1))}
              </Typography>
            </IconButton>
          <Clock />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderColor: '#1A2930',
            background: '#1A2930',
            color: 'white'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography 
            variant='h1' 
            sx={{
              font: 'italic 1.5em "Brush Script MT", "Brush Script Std", "Lucida Calligraphy", "Lucida Handwriting", "Apple Chancery", Cursive'
            }}
          >
            Synchronous<br />
            Aircraft<br />
            Logistics<br />
            Tracker
          </Typography>
          <IconButton
            onClick={handleDrawerClose}
            sx={{color: 'white'}}
          >
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <hr style={{margin: '10px'}} />
        <List>
          {["Today's Flying",'Fleet Status', 'Weekly Flying', 'New Sortie'].map((text, index) => (
            <ListItem 
              button 
              component={Link} 
              to={`/${text}`} 
              key={text}             
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                {icons[index]}
              </ListItemIcon>
              <ListItemText 
                primary={text} 
                sx={{
                  color: 'white'}} 
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={false}>
        <DrawerHeader />
        <Routes>
          <Route path='/' element={<FleetStatus />} />
          <Route path='Fleet%20Status' element={<FleetStatus />} />
          <Route path='New%20Sortie' element={<BuildSortie />} />
          <Route path='Scheduled%20Mx' element={<ScheduledMx />} />
          <Route path="Today's%20Flying" element={<TodaySorties />} />
          <Route path='Weekly%20Flying' element={<Flyingschedule />} />
        </Routes>
      </Main>
    </Box>
  );
};
