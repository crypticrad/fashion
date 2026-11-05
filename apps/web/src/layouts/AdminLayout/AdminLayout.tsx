import classNames from 'classnames';
import { motion } from 'motion/react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminNavbar } from '@/features/admin/AdminNavbar';
import { Sidebar } from '@/features/admin/Sidebar';
import { AdminLayoutProps as Props } from './AdminLayout.interface';
import cn from './AdminLayout.module.scss';

export const AdminLayout = (_props: Props) => {
  const { pathname } = useLocation();

  // TODO(API): protect admin routes once authentication/session endpoints exist.

  return (
    <div className={classNames(cn.adminLayout, 'flex grow bg-[#F4F4F4] text-black')}>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-auto">
        <AdminNavbar />
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="p-8"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};
