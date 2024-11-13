// CommitmentsPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import CommitmentsTable from '../components/CommitmentsTable';

const CommitmentsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Typography variant="h4" gutterBottom>Commitments</Typography>
      <CommitmentsTable />
    </div>
  );
};

export default CommitmentsPage;
