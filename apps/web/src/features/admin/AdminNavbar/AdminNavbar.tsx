import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Body } from '@/components/Typography/Body';
import { Heading } from '@/components/Typography/Heading';
import { Icon } from '@/components/Icon';
import { AdminNavbarProps as Props } from './AdminNavbar.interface';

const PAGE_COPY: Record<string, { title: string; subtitle: string }> = {
  '/admin/products': {
    title: 'Create Product',
    subtitle: 'Add a new item to your catalog'
  },
  '/admin/upload': {
    title: 'Bulk Upload',
    subtitle: 'Import products in bulk from a CSV file'
  },
  '/admin/users': {
    title: 'Users',
    subtitle: 'Manage customers and team members'
  }
};

export const AdminNavbar = (_props: Props) => {
  const { pathname } = useLocation();
  const copy = PAGE_COPY[pathname] ?? PAGE_COPY['/admin/products'];

  return (
    <header className="sticky top-0 z-5 flex items-center justify-between border-b border-black/8 bg-white px-8.5 py-4.5">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <Heading type="h4" className="uppercase">
            {copy.title}
          </Heading>
          <Body type="small" color="rgba(0,0,0,0.45)" className="mt-0.75">
            {copy.subtitle}
          </Body>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-3.5">
        <div className="flex w-65 items-center gap-2.25 rounded-full bg-[#F0F0F0] px-4 py-2.5">
          <Icon
            iconType="search"
            width={17}
            height={17}
            className="text-black/40"
          />
          <input
            placeholder="Search..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </div>

        <button
          type="button"
          className="relative flex size-10.5 items-center justify-center rounded-full bg-[#F0F0F0]"
        >
          <Icon
            iconType="bell outlined"
            width={19}
            height={19}
            className="text-black"
          />
          <span className="absolute top-2.25 right-2.5 size-2 rounded-full border-2 border-[#F0F0F0] bg-[#E5484D]" />
        </button>

        <div className="flex size-10.5 items-center justify-center rounded-full bg-black">
          <Body type="small" weight="bold" color="#FFF" className="leading-none">
            AD
          </Body>
        </div>
      </div>
    </header>
  );
};
