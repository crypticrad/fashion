export interface AdminUser {
  initials: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  orders: string;
  joined: string;
}

export interface UsersTableProps {
  users: AdminUser[];
}
