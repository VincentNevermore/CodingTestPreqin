import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchInvestors = () => axios.get(`${API_URL}/investors`);

export const fetchInvestorCommitments = (investorId: number, assetClass?: string) =>
    axios.get(`${API_URL}/investors/${investorId}/commitments`, {
        params: { asset_class: assetClass }
    });
