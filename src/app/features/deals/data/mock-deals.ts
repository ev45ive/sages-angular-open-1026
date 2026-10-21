import { Deal } from '../model/deal';

export const mockDeals: Deal[] = [
  {
    id: 'd1',
    title: 'Enterprise License — Tech Solutions',
    description: 'Annual enterprise license for 50 seats. Awaiting legal review.',
    stage: 'negotiation',
    value: 48000,
    contactName: 'Anna Kowalska',
    public: true,
  },
  {
    id: 'd2',
    title: 'Pilot Program — DataFlow',
    description: '3-month pilot for data integration module.',
    stage: 'new',
    value: 12000,
    contactName: 'Marek Nowak',
    public: false,
  },
];
