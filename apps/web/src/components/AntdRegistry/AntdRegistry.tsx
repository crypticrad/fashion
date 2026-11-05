import { ConfigProvider } from 'antd';
import { themeConfig } from '@/theme/themeConfig';
import { AntdRegistryProps as Props } from './AntdRegistry.interface';

export const AntdRegistry = ({ children }: Props) => (
  <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
);
