import React, { useState } from 'react';
import InvestorsTable from './components/InvestorsTable';
import CommitmentsTable from './components/CommitmentsTable';

const App: React.FC = () => {
  const [selectedInvestorId, setSelectedInvestorId] = useState<number | null>(null);

  return (
    <div>
      <h1>Investors</h1>
      <InvestorsTable onSelectInvestor={setSelectedInvestorId} />
      {selectedInvestorId && (
        <div>
          <h2>Commitments for Investor ID: {selectedInvestorId}</h2>
          <CommitmentsTable investorId={selectedInvestorId} />
        </div>
      )}
    </div>
  );
};

export default App;
