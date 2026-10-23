import { DealStage } from '@feature/deals/model/deal';

export const DEAL_STAGES: readonly DealStage[] = [
  'new',
  'proposal',
  'negotiation',
  'closed-lost',
  'closed-won',
];

export const DealStageLabel: Record<DealStage, string> = {
  new: 'New',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  'closed-lost': 'Closed (Lost)',
  'closed-won': 'Closed (Won)',
};
