import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import InvestorsTable from '../components/InvestorsTable';

const InvestorsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Typography variant="h4" gutterBottom>Investors</Typography>
      <InvestorsTable />
    </div>
  );
};

export default InvestorsPage;
