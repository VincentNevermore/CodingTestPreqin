import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchInvestors = () => axios.get(`${API_URL}/investors`);

export const fetchCommitments = (
  investorId?: number,
  assetClass?: string
) =>
  axios.get(`${API_URL}/commitments`, {
    params: {
      investor_id: investorId,
      asset_class: assetClass
    }
  }).then((response) => response.data);
