export type ContactStatus = 'lead' | 'prospect' | 'customer' | 'churned';

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  status: ContactStatus;
  avatarUrl: string;
  notes: string;
  createdAt: string;
}
