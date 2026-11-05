import { AntdRegistry } from '@/components/AntdRegistry';
import { AppProvidersProps as Props } from './AppProviders.interface';
import cn from './AppProviders.module.scss';

export const AppProviders = ({ children }: Props) => (
  <div className={cn.appProviders}>
    <AntdRegistry>{children}</AntdRegistry>
  </div>
);
