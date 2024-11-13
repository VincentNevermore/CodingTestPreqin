import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination, Select, MenuItem } from '@mui/material';
import { Investor } from '../types/types';
import { fetchInvestors } from '../api/api';

const InvestorsTable: React.FC = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [paginatedData, setPaginatedData] = useState<Investor[]>([]);

  useEffect(() => {
    fetchInvestors().then((response) => setInvestors(response.data));
  }, []);

  useEffect(() => {
    const start = page * pageSize;
    const end = start + pageSize;
    setPaginatedData(investors.slice(start, end));
  }, [investors, page, pageSize]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPageSize(Number(event.target.value));
    setPage(0);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Investors
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Total Commitment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((investor) => (
              <TableRow key={investor.id}>
                <TableCell>{investor.name}</TableCell>
                <TableCell>{investor.country}</TableCell>
                <TableCell>{investor.type}</TableCell>
                <TableCell>{investor.total_commitment.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={investors.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handlePageSizeChange}
        rowsPerPageOptions={[20, 50, 100]}
        labelRowsPerPage="Rows per page:"
      />
    </div>
  );
};

export default InvestorsTable;
