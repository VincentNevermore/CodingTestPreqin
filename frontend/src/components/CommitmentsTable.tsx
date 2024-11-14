import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Typography, TablePagination, SelectChangeEvent } from '@mui/material';
import { fetchCommitments } from '../api/api';

const investorMapping: Record<number, string> = {
  1: "Ioo Gryffindor fund",
  2: "Ibx Skywalker ltd",
  3: "Cza Weasley fund",
  4: "Mjd Jedi fund"
};

const assetClasses = [
  "Hedge Funds",
  "Infrastructure",
  "Natural Resources",
  "Private Debt",
  "Private Equity",
  "Real Estate"
];

interface Commitment {
  id: number;
  investor_id: number;
  asset_class: string;
  amount: number;
  currency: string;
  date_added: string;
  last_updated: string;
}

const CommitmentsPage: React.FC = () => {
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [selectedInvestor, setSelectedInvestor] = useState<number | null>(null);
  const [selectedAssetClass, setSelectedAssetClass] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const loadCommitments = async () => {
    try {
      const response = await fetchCommitments(selectedInvestor as number, selectedAssetClass as string);
      setCommitments(response);
    } catch (error) {
      console.error("Error fetching commitments:", error);
    }
  };

  useEffect(() => {
    loadCommitments();
  }, [selectedInvestor, selectedAssetClass, page, pageSize]);


  const handleInvestorChange = (event: SelectChangeEvent<number>) => {
    setSelectedInvestor(event.target.value === "" ? null : Number(event.target.value));
    setPage(0);
  };

  const handleAssetClassChange = (event: SelectChangeEvent<string>) => {
    setSelectedAssetClass(event.target.value === "" ? null : event.target.value);
    setPage(0);
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Commitments
      </Typography>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Select
          value={selectedInvestor || ""}
          onChange={handleInvestorChange}
          displayEmpty
          style={{ width: 200 }}
        >
          <MenuItem value=""><em>All Investors</em></MenuItem>
          {Object.entries(investorMapping).map(([id, name]) => (
            <MenuItem key={id} value={Number(id)}>{name}</MenuItem>
          ))}
        </Select>

        <Select
          value={selectedAssetClass || ""}
          onChange={handleAssetClassChange}
          displayEmpty
          style={{ width: 200 }}
        >
          <MenuItem value=""><em>All Asset Classes</em></MenuItem>
          {assetClasses.map((assetClass) => (
            <MenuItem key={assetClass} value={assetClass}>{assetClass}</MenuItem>
          ))}
        </Select>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Investor</TableCell>
              <TableCell>Asset Class</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Date Added</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commitments.slice(page * pageSize, page * pageSize + pageSize).map((commitment) => (
              <TableRow key={commitment.id}>
                <TableCell>{commitment.id}</TableCell>
                <TableCell>{investorMapping[commitment.investor_id] || "Unknown Investor"}</TableCell>
                <TableCell>{commitment.asset_class}</TableCell>
                <TableCell>{commitment.amount.toLocaleString()}</TableCell>
                <TableCell>{commitment.currency}</TableCell>
                <TableCell>{commitment.date_added}</TableCell>
                <TableCell>{commitment.last_updated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={commitments.length}
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

export default CommitmentsPage;
