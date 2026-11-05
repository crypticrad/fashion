import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { StorefrontLayoutProps as Props } from './StorefrontLayout.interface';
import cn from './StorefrontLayout.module.scss';

export const StorefrontLayout = (_props: Props) => (
  <div className={classNames(cn.storefrontLayout, 'flex flex-col')}>
    <Header />
    <div className="flex flex-1 flex-col">
      <Outlet />
    </div>
    <Footer />
  </div>
);
