'use client';

import { useState } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from 'antd';
import { Body } from '@/components/Typography/Body';
import { Icon } from '@/components/Icon';
import { UsersTableProps as Props } from './UsersTable.interface';

const FILTERS = ['All Users', 'Customers', 'Team'] as const;
type Filter = (typeof FILTERS)[number];

const CUSTOMER_ROLE = 'Customer';

const gridCols =
  'grid grid-cols-[2.6fr_1fr_1fr_0.8fr_1.1fr_44px] items-center gap-3.5';

export const UsersTable = (props: Props) => {
  const { users } = props;
  const [filter, setFilter] = useState<Filter>('All Users');

  const visible = users.filter((user) => {
    if (filter === 'Customers') return user.role === CUSTOMER_ROLE;
    if (filter === 'Team') return user.role !== CUSTOMER_ROLE;
    return true;
  });

  return (
    <div className="flex flex-col gap-5.5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {FILTERS.map((item) => {
            const active = filter === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={classNames(
                  'rounded-full px-4.5 py-2.25 transition-colors',
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

        <div className="flex items-center gap-3">
          <div className="flex w-[240px] items-center gap-2.25 rounded-full border border-black/12 bg-white px-4 py-2.5">
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
          <Button type="primary" size="large" className="rounded-full! px-5.5!">
            + Add User
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-black/7 bg-white">
        <div
          className={classNames(
            gridCols,
            'border-b border-black/8 px-6 py-4'
          )}
        >
          {['User', 'Role', 'Status', 'Orders', 'Joined', ''].map(
            (heading, index) => (
              <Body
                key={index}
                type="extrasmall"
                weight="bold"
                color="rgba(0,0,0,0.4)"
                className="uppercase tracking-[0.06em]"
              >
                {heading}
              </Body>
            )
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {visible.map((user, index) => {
              const activeStatus = user.status === 'Active';
              return (
                <motion.div
                  key={user.email}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    ease: 'easeOut',
                    delay: index * 0.04
                  }}
                  className={classNames(
                    gridCols,
                    'border-b border-black/5 px-6 py-3.75'
                  )}
                >
                  <div className="flex min-w-0 items-center gap-3.25">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F0F0F0]">
                      <Body
                        type="small"
                        weight="bold"
                        color="#000"
                        className="leading-none"
                      >
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

                  <Body type="small" color="rgba(0,0,0,0.65)">
                    {user.role}
                  </Body>

                  <div>
                    <span
                      className={classNames(
                        'inline-flex items-center gap-1.5 rounded-full px-2.75 py-1',
                        activeStatus ? 'bg-[#E7F4EC]' : 'bg-[#EFEFEF]'
                      )}
                    >
                      <span
                        className={classNames(
                          'size-1.5 rounded-full',
                          activeStatus ? 'bg-[#1F9254]' : 'bg-[#9AA0A6]'
                        )}
                      />
                      <Body
                        type="extrasmall"
                        weight="bold"
                        color={activeStatus ? '#1F9254' : '#5F6368'}
                        className="leading-none"
                      >
                        {user.status}
                      </Body>
                    </span>
                  </div>

                  <Body type="small" weight="semibold" color="#000">
                    {user.orders}
                  </Body>

                  <Body type="small" color="rgba(0,0,0,0.55)">
                    {user.joined}
                  </Body>

                  <button
                    type="button"
                    aria-label="More actions"
                    className="justify-self-center p-1 text-black/40 transition-colors hover:text-black"
                  >
                    <Icon iconType="more outlined" width={18} height={18} />
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between px-6 py-4">
          <Body type="small" color="rgba(0,0,0,0.5)">
            Showing {visible.length} of 30,214 users
          </Body>
          <div className="flex gap-2">
            <Button>Previous</Button>
            <Button type="primary">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
