export interface Investor {
  id: number;
  name: string;
  country: string;
  type: string;
  total_commitment: number;
}

export interface Commitment {
  id: number;
  Investor: string;
  asset_class: string;
  amount: number;
  currency: string;
  date_added: string;
  last_updated: string;
}

export const investorMapping: Record<number, string> = {
  1: "Ioo Gryffindor fund",
  2: "Ibx Skywalker ltd",
  3: "Cza Weasley fund",
  4: "Mjd Jedi fund"
};
