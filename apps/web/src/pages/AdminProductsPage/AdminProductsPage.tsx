import { CreateProductForm } from '@/features/admin/CreateProductForm';
import { AdminProductsPageProps as Props } from './AdminProductsPage.interface';
import cn from './AdminProductsPage.module.scss';

const BRANDS = [
  { id: 1, brand_name: 'Calvin Klein' },
  { id: 2, brand_name: 'Gucci' },
  { id: 3, brand_name: 'Prada' },
  { id: 4, brand_name: 'Versace' },
  { id: 5, brand_name: 'Zara' },
];

export const AdminProductsPage = (_props: Props) => (
  <main className={cn.adminProductsPage}>
    {/* TODO(API): load brands and submit product creation to the Custom API. */}
    <CreateProductForm brands={BRANDS} />
  </main>
);
