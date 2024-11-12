export interface Investor {
  id: number;
  name: string;
  country: string;
  type: string;
  total_commitment: number;
}

export interface Commitment {
  asset_class: string;
  amount: number;
  currency: string;
  date_added: string;
  last_updated: string;
}
