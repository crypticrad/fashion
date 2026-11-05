import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import { Body } from '@/components/Typography/Body';
import { Heading } from '@/components/Typography/Heading';
import { AuthLayoutProps as Props } from './AuthLayout.interface';
import cn from './AuthLayout.module.scss';

const BrandRunner = ({ className, outlined = false }: { className: string; outlined?: boolean }) => (
  <div className={classNames('flex w-max', className)}>
    {[false, true].map((duplicate) => (
      <span
        key={String(duplicate)}
        aria-hidden={duplicate || undefined}
        className={classNames('heading-h1-regular whitespace-nowrap text-[84px]', outlined ? 'text-transparent' : 'text-white')}
        style={outlined ? { WebkitTextStroke: '1.4px rgba(255,255,255,0.55)' } : undefined}
      >
        RAD · RAD · RAD · RAD · RAD · RAD ·&nbsp;
      </span>
    ))}
  </div>
);

export const AuthLayout = (_props: Props) => (
  <div className={classNames(cn.authLayout, 'flex w-full')}>
    <section className="relative hidden flex-[1.2] flex-col overflow-hidden bg-black px-14 py-11 lg:flex">
      <div className="flex flex-1 flex-col justify-center gap-1">
        <BrandRunner className="animate-runner-26" outlined />
        <BrandRunner className="animate-runner-34" />
        <BrandRunner className="animate-runner-20 opacity-70" />
        <BrandRunner className="animate-runner-30" outlined />
      </div>
      <div className="pointer-events-none absolute inset-0 z-2 bg-[linear-gradient(90deg,rgba(0,0,0,0.85),rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.25)_55%,rgba(0,0,0,0.85))]" />
      <div className="z-3 max-w-[430px] shrink-0">
        <Heading type="h3" className="mb-[10px] max-w-[400px] uppercase leading-[1.02]" color="white">
          Run the whole store<br />from one place
        </Heading>
        <Body color="rgba(255, 255, 255, 0.5)">
          Catalog, orders, customers and analytics — unified in a single, focused console.
        </Body>
      </div>
    </section>
    <main className="flex flex-1 items-center justify-center bg-white px-6 py-10">
      <Outlet />
    </main>
  </div>
);
