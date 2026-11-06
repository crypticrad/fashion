import { useState } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'motion/react';
import { Button, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { Body } from '@/components/Typography/Body';
import { Icon } from '@/components/Icon';
import { AdminUser, UsersTableProps as Props } from './UsersTable.interface';
import cn from './UsersTable.module.scss';

const FILTERS = ['All Users', 'Customers', 'Team'] as const;
type Filter = (typeof FILTERS)[number];

const CUSTOMER_ROLE = 'Customer';
const PAGE_SIZE_OPTIONS = [10, 20, 50];

// Body scrolls inside the card: viewport minus navbar (90), page padding (2 × 32),
// toolbar (40) + gap (22), card borders (2), table header (49) and pagination (64).
// Below 900px wide the table scrolls horizontally instead of squashing columns.
const TABLE_SCROLL = { x: 900, y: 'max(240px, calc(100vh - 332px))' };

const heading = (label: string) => (
  <Body
    type="extrasmall"
    weight="bold"
    color="rgba(0,0,0,0.4)"
    className="uppercase tracking-[0.06em]"
  >
    {label}
  </Body>
);

const columns: TableColumnsType<AdminUser> = [
  {
    key: 'user',
    title: heading('User'),
    render: (_, user) => (
      <div className="flex min-w-0 items-center gap-3.25">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F0F0F0]">
          <Body type="small" weight="bold" color="#000" className="leading-none">
            {user.initials}
          </Body>
        </div>
        <div className="min-w-0">
          <Body
            type="small"
            weight="semibold"
            color="#000"
            className="truncate leading-tight"
          >
            {user.name}
          </Body>
          <Body
            type="extrasmall"
            color="rgba(0,0,0,0.45)"
            className="truncate leading-tight"
          >
            {user.email}
          </Body>
        </div>
      </div>
    )
  },
  {
    key: 'role',
    title: heading('Role'),
    width: 150,
    render: (_, user) => (
      <Body type="small" color="rgba(0,0,0,0.65)">
        {user.role}
      </Body>
    )
  },
  {
    key: 'status',
    title: heading('Status'),
    width: 150,
    render: (_, user) => {
      const active = user.status === 'Active';
      return (
        <span
          className={classNames(
            'inline-flex items-center gap-1.5 rounded-full px-2.75 py-1',
            active ? 'bg-[#E7F4EC]' : 'bg-[#EFEFEF]'
          )}
        >
          <span
            className={classNames(
              'size-1.5 rounded-full',
              active ? 'bg-[#1F9254]' : 'bg-[#9AA0A6]'
            )}
          />
          <Body
            type="extrasmall"
            weight="bold"
            color={active ? '#1F9254' : '#5F6368'}
            className="leading-none"
          >
            {user.status}
          </Body>
        </span>
      );
    }
  },
  {
    key: 'orders',
    title: heading('Orders'),
    width: 120,
    render: (_, user) => (
      <Body type="small" weight="semibold" color="#000">
        {user.orders}
      </Body>
    )
  },
  {
    key: 'joined',
    title: heading('Joined'),
    width: 150,
    render: (_, user) => (
      <Body type="small" color="rgba(0,0,0,0.55)">
        {user.joined}
      </Body>
    )
  },
  {
    key: 'actions',
    width: 68,
    align: 'center',
    render: () => (
      <button
        type="button"
        aria-label="More actions"
        className="p-1 text-black/40 transition-colors hover:text-black"
      >
        <Icon iconType="more outlined" width={18} height={18} />
      </button>
    )
  }
];

export const UsersTable = (props: Props) => {
  const { users } = props;
  const [filter, setFilter] = useState<Filter>('All Users');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: PAGE_SIZE_OPTIONS[0]
  });

  const visible = users.filter((user) => {
    if (filter === 'Customers') return user.role === CUSTOMER_ROLE;
    if (filter === 'Team') return user.role !== CUSTOMER_ROLE;
    return true;
  });

  return (
    <div className={classNames(cn.usersTable, 'flex flex-col gap-5.5')}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex shrink-0 items-center gap-2">
          {FILTERS.map((item) => {
            const active = filter === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setFilter(item);
                  setPagination((prev) => ({ ...prev, current: 1 }));
                }}
                className={classNames(
                  'flex h-10 items-center rounded-full px-4.5 transition-colors',
                  active ? 'bg-black' : 'border border-black/12 bg-white'
                )}
              >
                <Body
                  type="small"
                  weight="semibold"
                  color={active ? '#FFF' : 'rgba(0,0,0,0.6)'}
                  className="leading-none"
                >
                  {item}
                </Body>
              </button>
            );
          })}
        </div>

        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-60 min-w-36 items-center gap-2.25 rounded-full border border-black/12 bg-white px-4">
            <Icon
              iconType="search"
              width={16}
              height={16}
              className="text-black/40"
            />
            <input
              placeholder="Search users..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </div>
          <Button type="primary" size="large" className="h-10! shrink-0 rounded-full! px-5.5!">
            + Add User
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="overflow-hidden rounded-[20px] border border-black/7 bg-white"
        >
          <Table<AdminUser>
            rowKey="email"
            columns={columns}
            dataSource={visible}
            tableLayout="fixed"
            scroll={TABLE_SCROLL}
            locale={{ emptyText: 'No users found.' }}
            pagination={{
              ...pagination,
              total: visible.length,
              showSizeChanger: true,
              pageSizeOptions: PAGE_SIZE_OPTIONS,
              showTotal: (total, [start, end]) =>
                `Showing ${start}–${end} of ${total} users`,
              onChange: (current, pageSize) =>
                setPagination({ current, pageSize })
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
