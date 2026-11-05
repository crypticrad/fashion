import classNames from 'classnames';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { Heading } from '@/components/Typography/Heading';
import { CartContents } from '@/features/cart/CartContents';
import { CART_ITEMS, DELIVERY_FEE, DISCOUNT_RATE } from '@/features/cart/cart.data';
import { CartPageProps as Props } from './CartPage.interface';
import cn from './CartPage.module.scss';

export const CartPage = (_props: Props) => (
  <div className={classNames(cn.cartPage, 'mx-auto mb-[170px] flex w-full max-w-[1240px] flex-col gap-6 px-4 py-8')}>
    <Breadcrumb items={[{ title: <Link to="/">Home</Link> }, { title: 'Cart' }]} />
    <Heading type="h1" size={40} weight="bold" color="#000" className="uppercase leading-none">Your Cart</Heading>
    {/* TODO(API): replace fixture cart and persist quantity/removal mutations. */}
    <CartContents items={CART_ITEMS} discountRate={DISCOUNT_RATE} deliveryFee={DELIVERY_FEE} />
  </div>
);
