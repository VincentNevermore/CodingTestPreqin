import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Typography, AppBar, Toolbar, Button } from '@mui/material';
import InvestorsPage from './pages/InvestorsPage';
import CommitmentsPage from './pages/CommitmentsPage';

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Investors</Button>
          <Button color="inherit" component={Link} to="/commitments">Commitments</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<InvestorsPage />} />
          <Route path="/commitments" element={<CommitmentsPage  />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
