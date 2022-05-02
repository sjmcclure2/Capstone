import Header from './components/header';
import Home from './components/home';
import { Container } from '@mui/material';
import { Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Container>
      <Header />
      <Home />
    </Container>
  );
}

export default App;
