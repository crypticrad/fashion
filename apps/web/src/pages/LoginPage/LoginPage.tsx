import type { FormEvent } from 'react';
import { Button, Checkbox, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { Body } from '@/components/Typography/Body';
import { Heading } from '@/components/Typography/Heading';
import { LoginPageProps as Props } from './LoginPage.interface';
import cn from './LoginPage.module.scss';

export const LoginPage = (_props: Props) => {
  const brandName = import.meta.env.VITE_BRAND ?? 'SHOP.CO';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO(API): authenticate, persist the session, then redirect to /admin.
    void message.info('Login API integration is pending.');
  };

  return (
    <div className={cn.loginPage}>
      <Heading type="h4" className="mb-10">{brandName}</Heading>
      <Heading type="h2" className="mb-2 tracking-wide">Welcome back</Heading>
      <Body color="rgba(0,0,0,0.5)">Sign in to your account to continue</Body>
      <form onSubmit={handleSubmit} className="my-8 flex flex-col gap-2">
        <label htmlFor="email" className="body-extrasmall-semibold uppercase tracking-[0.08em] text-black/50">Email address</label>
        <Input id="email" name="email" type="email" size="large" required style={{ marginBottom: 8 }} placeholder="email@host.com" />
        <label htmlFor="password" className="body-extrasmall-semibold flex justify-between tracking-[0.08em] text-black/50">
          PASSWORD <Link to="/forgot" className="text-black tracking-normal">Forgot?</Link>
        </label>
        <Input.Password id="password" name="password" size="large" required style={{ marginBottom: 8 }} />
        <Checkbox>Keep me signed in</Checkbox>
        <Button htmlType="submit" type="primary" size="large" className="mt-5">Log In</Button>
      </form>
      <div className="my-[26px] flex items-center justify-center gap-[10px]">
        <span className="h-0.5 flex-1 bg-black/10" /><span className="body-extrasmall-regular text-black/60">OR</span><span className="h-0.5 flex-1 bg-black/10" />
      </div>
      <div className="flex gap-3"><Button size="large" className="flex-1">Google</Button><Button size="large" className="flex-1">Apple</Button></div>
      <Body className="mt-8 flex justify-center gap-1" color="rgba(0,0,0,0.5)">Don&apos;t have an account? <span className="font-semibold text-black">Sign Up</span></Body>
    </div>
  );
};
