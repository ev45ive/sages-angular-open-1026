export type DealStage = 'new' | 'negotiation' | 'proposal' | 'closed-won' | 'closed-lost';

export interface Deal {
  id: string;
  title: string;
  description: string;
  stage: DealStage;
  value: number;
  contactName: string;
  public: boolean;
  // tasks?: []; //
}
