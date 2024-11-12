import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Investor } from '../types/types';
import { fetchInvestors } from '../api/api';

interface InvestorsTableProps {
  onSelectInvestor: (investorId: number) => void;
}

const InvestorsTable: React.FC<InvestorsTableProps> = ({ onSelectInvestor }) => {
  const [investors, setInvestors] = useState<Investor[]>([]);

  useEffect(() => {
    fetchInvestors().then((response) => setInvestors(response.data));
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'country', headerName: 'Country', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'total_commitment', headerName: 'Total Commitment', width: 200 },
  ];

  return (
    <DataGrid
      rows={investors}
      columns={columns}
      pageSizeOptions={[5, 10, 20]}  // Use pageSizeOptions instead of pageSize
      initialState={{
        pagination: {
          paginationModel: { pageSize: 5, page: 0 },
        },
      }}
    getRowId={(row) => row.id}
    onPaginationModelChange={(newModel) => console.log(newModel)}
  />
  );
};

export default InvestorsTable;
