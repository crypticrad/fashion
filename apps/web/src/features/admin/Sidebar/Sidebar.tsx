import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Body } from '@/components/Typography/Body';
import { Heading } from '@/components/Typography/Heading';
import { Icon } from '@/components/Icon';
import { SidebarProps as Props } from './Sidebar.interface';

const navItems = [
  { label: 'Users', href: '/admin/users', icon: 'users outlined' },
  { label: 'Products', href: '/admin/products', icon: 'box outlined' },
  { label: 'Bulk Upload', href: '/admin/upload', icon: 'upload outlined' }
] as const;

export const Sidebar = (_props: Props) => {
  const brandName = import.meta.env.VITE_BRAND ?? 'SHOP.CO';
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="sticky top-0 flex h-screen w-64.5 shrink-0 flex-col bg-black px-4.5 py-6.5 text-white">
      <Heading type="h4" className="mb-9.5 px-2">
        {brandName}
      </Heading>

      <Body
        type="extrasmall"
        weight="bold"
        color="rgba(255,255,255,0.3)"
        className="mb-3 px-3.5 tracking-[0.12em]"
      >
        MANAGE
      </Body>

      <nav className="flex flex-col gap-1.5">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={classNames(
                'flex items-center gap-3 rounded-full px-4 py-2.75 transition-colors',
                active ? 'bg-white' : 'hover:bg-white/10'
              )}
            >
              <Icon
                iconType={item.icon}
                width={19}
                height={19}
                className={active ? 'text-black' : 'text-white/55'}
              />
              <Body
                type="normal"
                weight="semibold"
                color={active ? '#000' : 'rgba(255,255,255,0.55)'}
                className="leading-none"
              >
                {item.label}
              </Body>
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      <div className="flex items-center gap-2.75 border-t border-white/12 pt-4">
        <div className="flex size-9.5 shrink-0 items-center justify-center rounded-full bg-white">
          <Body
            type="small"
            weight="bold"
            color="#000"
            className="leading-none"
          >
            AD
          </Body>
        </div>
        <div className="min-w-0 flex-1">
          <Body
            type="small"
            weight="semibold"
            color="#FFF"
            className="truncate leading-tight"
          >
            Admin User
          </Body>
          <Body
            type="extrasmall"
            color="rgba(255,255,255,0.45)"
            className="truncate leading-tight"
          >
            admin@shop.co
          </Body>
        </div>
        <button
          type="button"
          title="Log out"
          onClick={() => navigate('/login')}
          className="p-1.5 text-white/50 transition-colors hover:text-white"
        >
          <Icon iconType="logout outlined" width={18} height={18} />
        </button>
      </div>
    </aside>
  );
};
