import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Body } from '@/components/Typography/Body';
import { Heading } from '@/components/Typography/Heading';
import { NotFoundPageProps as Props } from './NotFoundPage.interface';
import cn from './NotFoundPage.module.scss';

export const NotFoundPage = (_props: Props) => (
  <main className={classNames(cn.notFoundPage, 'flex flex-col items-center justify-center gap-5 px-6 text-center')}>
    <Heading type="h1">404</Heading>
    <Body color="rgba(0,0,0,0.6)">That page does not exist yet.</Body>
    <Link to="/" className="body-normal-semibold rounded-full bg-black px-6 py-3 text-white">Back to home</Link>
  </main>
);
