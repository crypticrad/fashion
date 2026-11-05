import classNames from 'classnames';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { CatalogPagination } from '@/features/catalog/CatalogPagination';
import { Filters } from '@/features/catalog/Filters';
import { Products } from '@/features/catalog/Products';
import { CATALOG_PRODUCTS } from '@/features/catalog/catalog.data';
import { CatalogPageProps as Props } from './CatalogPage.interface';
import cn from './CatalogPage.module.scss';

export const CatalogPage = (_props: Props) => (
  <div className={classNames(cn.catalogPage, 'mx-auto mb-[170px] flex w-full max-w-[1240px] flex-col gap-8 px-4 py-8')}>
    <Breadcrumb className="mb-6" items={[{ title: <Link to="/">Home</Link> }, { title: 'Catalog' }]} />
    <div className="flex flex-col gap-5 md:flex-row md:items-start">
      <div className="md:w-[295px] md:shrink-0"><Filters /></div>
      <div className="flex flex-1 flex-col gap-8">
        {/* TODO(API): replace fixture products and total with the catalog endpoint. */}
        <Products products={CATALOG_PRODUCTS} />
        <CatalogPagination total={100} />
      </div>
    </div>
  </div>
);
