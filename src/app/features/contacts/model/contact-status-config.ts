import { ContactStatus } from './contact';

export const ContactStatusLabel: Record<ContactStatus, string> = {
  lead: 'Lead',
  prospect: 'Prospect',
  customer: 'Customer',
  churned: 'Churned',
};
