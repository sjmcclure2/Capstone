import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AirlinesIcon from '@mui/icons-material/Airlines';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import Home from './components/home';
import { Route, Routes, Link } from 'react-router-dom';
import FleetStatus from './components/fleetstatus';
import Flyingschedule from './components/flyingschedule';
import RedBall from './components/redball';
import ScheduledMx from './components/scheduledmx';
import image from './preview.jpeg';

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
  const [open, setOpen] = React.useState(false);
  const icons = [
    <AirlinesIcon sx={{color: "#FDFD96"}}/>, 
    <EngineeringIcon sx={{color: "#FDFD96"}}/>, 
    <ConnectingAirportsIcon sx={{color: "#FDFD96"}}/>, 
    <CalendarViewMonthIcon sx={{color: "#FDFD96"}}/>, 
    <NotificationImportantIcon sx={{color: "#FDFD96"}}/> ]
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%', backgroundImage: `url(${image})`}}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{backgroundColor: '#1A2930', borderLeft: '1px solid', borderColor: '#242423'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {decodeURI(window.location.pathname.slice(1))}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderColor: '#1A2930'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{backgroundColor: '#1A2930'}}>
          <Typography variant='h5' sx={{paddingRight: '25%', color: 'white', fontFamily: 'cursive'}}>SALT</Typography>
          <IconButton onClick={handleDrawerClose} sx={{color: 'white'}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List sx={{backgroundColor: '#1A2930', height: '100%'}}>
          {['Fliers', 'Scheduled Mx', 'Fleet Status', 'Flying Schedule', 'New Red Ball'].map((text, index) => (
            <ListItem button component={Link} to={`/${text}`} key={text}>
              <ListItemIcon>
                {icons[index]}
              </ListItemIcon>
              <ListItemText primary={text} sx={{color: 'white'}} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='Fliers' element={<Home/>}/>
          <Route path='Scheduled%20Mx' element={<ScheduledMx/>}/>
          <Route path='Flying%20Schedule' element={<Flyingschedule/>}/>
          <Route path='New%20Red%20Ball' element={<RedBall/>}/>
          <Route path='Fleet%20Status' element={<FleetStatus/>}/>
        </Routes>
      </Main>
    </Box>
  );
}
