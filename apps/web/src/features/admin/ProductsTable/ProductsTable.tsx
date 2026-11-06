import { useState } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'motion/react';
import { Button, Dropdown, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { Body } from '@/components/Typography/Body';
import { Icon } from '@/components/Icon';
import {
  AdminProduct,
  ProductsTableProps as Props
} from './ProductsTable.interface';
import cn from './ProductsTable.module.scss';

const FILTERS = ['All Products', 'Men', 'Women', 'Unisex'] as const;
type Filter = (typeof FILTERS)[number];

const FILTER_GENDER: Record<Filter, string | null> = {
  'All Products': null,
  Men: 'MALE',
  Women: 'FEMALE',
  Unisex: 'UNISEX'
};

const PAGE_SIZE_OPTIONS = [10, 20, 50];

// Body scrolls inside the card: viewport minus navbar (90), page padding (2 × 32),
// toolbar (40) + gap (22), card borders (2), table header (49) and pagination (64).
// Below 900px wide the table scrolls horizontally instead of squashing columns.
const TABLE_SCROLL = { x: 900, y: 'max(240px, calc(100vh - 332px))' };
const MAX_SWATCHES = 4;

const toLabel = (value: string) =>
  value.charAt(0) + value.slice(1).toLowerCase();

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

export const ProductsTable = (props: Props) => {
  const { products, brands, onAdd, onEdit, onDelete } = props;
  const [filter, setFilter] = useState<Filter>('All Products');
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: PAGE_SIZE_OPTIONS[0]
  });

  const resetPage = () => setPagination((prev) => ({ ...prev, current: 1 }));

  const brandName = (id: number) =>
    brands.find((brand) => brand.id === id)?.brand_name ?? '—';

  const query = search.trim().toLowerCase();
  const visible = products.filter((product) => {
    const gender = FILTER_GENDER[filter];
    if (gender && !product.gender.includes(gender)) return false;
    return !query || product.name.toLowerCase().includes(query);
  });

  const columns: TableColumnsType<AdminProduct> = [
    {
      key: 'product',
      title: heading('Product'),
      render: (_, product) => (
        <div className="flex min-w-0 items-center gap-3.25">
          <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F0F0F0]">
            {product.product_image ? (
              <img
                src={product.product_image}
                alt=""
                className="size-full object-cover"
              />
            ) : (
              <Icon
                iconType="box outlined"
                width={18}
                height={18}
                className="text-black/40"
              />
            )}
          </div>
          <div className="min-w-0">
            <Body
              type="small"
              weight="semibold"
              color="#000"
              className="truncate leading-tight"
            >
              {product.name}
            </Body>
            <Body
              type="extrasmall"
              color="rgba(0,0,0,0.45)"
              className="truncate leading-tight"
            >
              {brandName(product.brand_id)}
            </Body>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      title: heading('Category'),
      width: 150,
      render: (_, product) => (
        <Body type="small" color="rgba(0,0,0,0.65)">
          {product.category ? toLabel(product.category) : '—'}
        </Body>
      )
    },
    {
      key: 'style',
      title: heading('Style'),
      width: 140,
      render: (_, product) =>
        product.style ? (
          <span className="inline-flex items-center rounded-full bg-[#EFEFEF] px-2.75 py-1">
            <Body
              type="extrasmall"
              weight="bold"
              color="#5F6368"
              className="leading-none"
            >
              {toLabel(product.style)}
            </Body>
          </span>
        ) : (
          <Body type="small" color="rgba(0,0,0,0.65)">
            —
          </Body>
        )
    },
    {
      key: 'colors',
      title: heading('Colors'),
      width: 150,
      render: (_, product) => (
        <div className="flex items-center gap-1.5">
          {product.color.slice(0, MAX_SWATCHES).map((hex) => (
            <span
              key={hex}
              title={hex}
              className="size-4.5 rounded-full border border-black/15"
              style={{ backgroundColor: hex }}
            />
          ))}
          {product.color.length > MAX_SWATCHES && (
            <Body type="extrasmall" color="rgba(0,0,0,0.45)">
              +{product.color.length - MAX_SWATCHES}
            </Body>
          )}
        </div>
      )
    },
    {
      key: 'price',
      title: heading('Price'),
      width: 120,
      render: (_, product) => (
        <Body type="small" weight="semibold" color="#000">
          ${product.price.toFixed(2)}
        </Body>
      )
    },
    {
      key: 'actions',
      width: 68,
      align: 'center',
      render: (_, product) => (
        <Dropdown
          trigger={['click']}
          placement="bottomRight"
          menu={{
            items: [
              { key: 'edit', label: 'Update product' },
              { key: 'delete', label: 'Delete', danger: true }
            ],
            onClick: ({ key }) =>
              key === 'edit' ? onEdit(product) : onDelete(product)
          }}
        >
          <button
            type="button"
            aria-label="More actions"
            className="p-1 text-black/40 transition-colors hover:text-black"
          >
            <Icon iconType="more outlined" width={18} height={18} />
          </button>
        </Dropdown>
      )
    }
  ];

  return (
    <div className={classNames(cn.productsTable, 'flex flex-col gap-5.5')}>
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
                  resetPage();
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
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                resetPage();
              }}
              placeholder="Search products..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </div>
          <Button
            type="primary"
            size="large"
            className="h-10! shrink-0 rounded-full! px-5.5!"
            onClick={onAdd}
          >
            + Add Product
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
          <Table<AdminProduct>
            rowKey="id"
            columns={columns}
            dataSource={visible}
            tableLayout="fixed"
            scroll={TABLE_SCROLL}
            locale={{ emptyText: 'No products found.' }}
            pagination={{
              ...pagination,
              total: visible.length,
              showSizeChanger: true,
              pageSizeOptions: PAGE_SIZE_OPTIONS,
              showTotal: (total, [start, end]) =>
                `Showing ${start}–${end} of ${total} products`,
              onChange: (current, pageSize) =>
                setPagination({ current, pageSize })
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
