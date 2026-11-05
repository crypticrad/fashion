import { Home } from '@/features/storefront/Home';
import { HomePageProps as Props } from './HomePage.interface';
import cn from './HomePage.module.scss';

export const HomePage = (_props: Props) => (
  <main className={cn.homePage}>
    <Home />
  </main>
);
