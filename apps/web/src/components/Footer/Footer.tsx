import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import { Icons } from '../Icon/Icons';
import { FooterProps as Props, FooterColumn } from './Footer.interface';

const footerColumns: FooterColumn[] = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Features', href: '/features' },
      { label: 'Works', href: '/works' },
      { label: 'Career', href: '/career' }
    ]
  },
  {
    title: 'Help',
    links: [
      { label: 'Customer Support', href: '/support' },
      { label: 'Delivery Details', href: '/delivery' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' }
    ]
  },
  {
    title: 'FAQ',
    links: [
      { label: 'Account', href: '/account' },
      { label: 'Manage Deliveries', href: '/manage-deliveries' },
      { label: 'Orders', href: '/orders' },
      { label: 'Payments', href: '/payments' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Free eBooks', href: '/ebooks' },
      { label: 'Development Tutorial', href: '/tutorial' },
      { label: 'How to - Blog', href: '/blog' },
      { label: 'Youtube Playlist', href: '/playlist' }
    ]
  }
];

const socials: { iconType: `${Icons}`; href: string; label: string }[] = [
  { iconType: Icons.TWITTER, href: 'https://twitter.com', label: 'Twitter' },
  { iconType: Icons.FACEBOOK, href: 'https://facebook.com', label: 'Facebook' },
  {
    iconType: Icons.INSTAGRAM,
    href: 'https://instagram.com',
    label: 'Instagram'
  },
  { iconType: Icons.GITHUB, href: 'https://github.com', label: 'GitHub' }
];

const payments: `${Icons}`[] = [
  Icons.VISA,
  Icons.MASTERCARD,
  Icons.PAYPAL,
  Icons.APPLE_PAY,
  Icons.GOOGLE_PAY
];

export const Footer = (props: Props) => {
  const brandName = props.brandName ?? import.meta.env.VITE_BRAND ?? 'SHOP.CO';
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO(API): submit the newsletter subscription to the Custom API.
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="relative w-full bg-[#f0f0f0] pt-9 text-black">
      <div className="mx-auto -mt-18 w-full max-w-310 px-4">
        <div className="flex flex-col items-center gap-8 rounded-[20px] bg-black px-6 py-8 lg:flex-row lg:justify-between lg:px-16 lg:py-9">
          <h2 className="heading-h2-bold w-full text-center leading-11.25! text-white lg:w-137.75 lg:text-left">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>

          <form
            onSubmit={handleSubscribe}
            className="flex w-full flex-col gap-3.5 lg:w-87.25 lg:shrink-0"
          >
            <label className="flex items-center gap-3 rounded-[62px] bg-white px-4 py-3">
              <Icon
                iconType={Icons.MAIL}
                color="rgba(0,0,0,0.4)"
                width={20}
                height={20}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="body-normal-regular min-w-0 flex-1 bg-transparent text-black placeholder:text-black/40 focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="body-normal-semi500 rounded-[62px] bg-white px-4 py-3 text-black transition-colors hover:bg-neutral-200"
            >
              Subscribe to Newsletter
            </button>
            {subscribed && (
              <p className="body-small-regular text-white/80">
                Thanks for subscribing.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Main footer body */}
      <div className="mx-auto w-full max-w-310 px-4 pt-12.5">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-8">
          {/* Brand */}
          <div className="flex max-w-62 flex-col gap-6.25">
            <Link to="/" className="heading-h3-bold text-black">
              {brandName}
            </Link>
            <p className="body-small-regular text-black/60">
              We have clothes that suits your style and which you&rsquo;re proud
              to wear. From women to men.
            </p>
            <ul className="mt-2.5 flex items-center gap-3">
              {socials.map(({ iconType, href, label }) => (
                <li key={label}>
                  <Link
                    to={href}
                    aria-label={label}
                    className="flex size-7 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-colors hover:bg-black hover:text-white"
                  >
                    <Icon iconType={iconType} color="currentColor" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          {footerColumns.map(({ title, links }) => (
            <nav key={title} className="flex flex-col gap-6.5">
              <p className="body-normal-semi500 uppercase tracking-[3px] text-black">
                {title}
              </p>
              <ul className="flex flex-col gap-4">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      to={href}
                      className="body-normal-regular text-black/60 transition-colors hover:text-black"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12.5 flex flex-col items-center gap-4 border-t border-black/10 py-6 sm:flex-row sm:justify-between">
          <p className="body-small-regular text-black/60">
            {brandName?.replace(/\.CO$/i, '.co')} &copy; 2000-2023, All Rights
            Reserved
          </p>
          <ul className="flex items-center gap-3">
            {payments.map((iconType) => (
              <li key={iconType}>
                <Icon iconType={iconType} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
