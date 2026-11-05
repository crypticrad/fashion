import { UsersTable } from '@/features/admin/UsersTable';
import type { AdminUser } from '@/features/admin/UsersTable';
import { AdminUsersPageProps as Props } from './AdminUsersPage.interface';
import cn from './AdminUsersPage.module.scss';

const USERS: AdminUser[] = [
  { initials: 'SM', name: 'Sarah Mitchell', email: 'sarah.mitchell@email.com', role: 'Customer', status: 'Active', orders: '12', joined: 'Jan 12, 2025' },
  { initials: 'AK', name: 'Alex Kim', email: 'alex.kim@email.com', role: 'Customer', status: 'Active', orders: '8', joined: 'Feb 03, 2025' },
  { initials: 'JL', name: 'James Lopez', email: 'james.lopez@email.com', role: 'Admin', status: 'Active', orders: '—', joined: 'Nov 21, 2024' },
  { initials: 'MW', name: 'Mia Wong', email: 'mia.wong@email.com', role: 'Customer', status: 'Inactive', orders: '3', joined: 'Mar 15, 2025' },
  { initials: 'DR', name: 'Diego Ramos', email: 'diego.ramos@email.com', role: 'Customer', status: 'Active', orders: '21', joined: 'Dec 09, 2024' },
  { initials: 'PT', name: 'Priya Tandon', email: 'priya.tandon@email.com', role: 'Editor', status: 'Active', orders: '—', joined: 'Jan 28, 2025' },
  { initials: 'CB', name: 'Chris Bauer', email: 'chris.bauer@email.com', role: 'Customer', status: 'Inactive', orders: '1', joined: 'Apr 02, 2025' },
];

export const AdminUsersPage = (_props: Props) => (
  <main className={cn.adminUsersPage}>
    {/* TODO(API): replace fixture rows with paginated users from the Custom API. */}
    <UsersTable users={USERS} />
  </main>
);
