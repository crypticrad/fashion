import React from 'react';
import { SVGIconProps } from '../Icon.interface';
import { IconApplePay } from './IconApplePay';
import { IconArrowLeftOutlined } from './IconArrowLeftOutlined';
import { IconArrowRightFilled } from './IconArrowRightFilled';
import { IconArrowRightOutlined } from './IconArrowRightOutlined';
import { IconBellOutlined } from './IconBellOutlined';
import { IconBoxOutlined } from './IconBoxOutlined';
import { IconCalvinKlein } from './IconCalvinKlein';
import { IconCart } from './IconCart';
import { IconChevronDownOutlined } from './IconChevronDownOutlined';
import { IconFacebook } from './IconFacebook';
import { IconGithub } from './IconGithub';
import { IconGooglePay } from './IconGooglePay';
import { IconGucci } from './IconGucci';
import { IconInstagram } from './IconInstagram';
import { IconLogoutOutlined } from './IconLogoutOutlined';
import { IconMail } from './IconMail';
import { IconMastercard } from './IconMastercard';
import { IconMoreOutlined } from './IconMoreOutlined';
import { IconPaypal } from './IconPaypal';
import { IconPrada } from './IconPrada';
import { IconSearch } from './IconSearch';
import { IconSlidersOutlined } from './IconSlidersOutlined';
import { IconSparkle } from './IconSparkle';
import { IconTagFilled } from './IconTagFilled';
import { IconTrashFilled } from './IconTrashFilled';
import { IconTwitter } from './IconTwitter';
import { IconUploadOutlined } from './IconUploadOutlined';
import { IconUser } from './IconUser';
import { IconUsersOutlined } from './IconUsersOutlined';
import { IconVersace } from './IconVersace';
import { IconVisa } from './IconVisa';
import { IconZara } from './IconZara';

export enum Icons {
  APPLE_PAY = 'apple-pay',
  ARROW_LEFT_OUTLINED = 'arrow left outlined',
  ARROW_RIGHT_FILLED = 'arrow right filled',
  ARROW_RIGHT_OUTLINED = 'arrow right outlined',
  BELL_OUTLINED = 'bell outlined',
  BOX_OUTLINED = 'box outlined',
  CALVIN_KLEIN = 'calvin-klein',
  CART = 'cart',
  CHEVRON_DOWN_OUTLINED = 'chevron down outlined',
  FACEBOOK = 'facebook',
  GITHUB = 'github',
  GOOGLE_PAY = 'google-pay',
  GUCCI = 'gucci',
  INSTAGRAM = 'instagram',
  LOGOUT_OUTLINED = 'logout outlined',
  MAIL = 'mail',
  MASTERCARD = 'mastercard',
  MORE_OUTLINED = 'more outlined',
  PAYPAL = 'paypal',
  PRADA = 'prada',
  SEARCH = 'search',
  SLIDERS_OUTLINED = 'sliders outlined',
  SPARKLE = 'sparkle',
  TAG_FILLED = 'tag filled',
  TRASH_FILLED = 'trash filled',
  TWITTER = 'twitter',
  UPLOAD_OUTLINED = 'upload outlined',
  USER = 'user',
  USERS_OUTLINED = 'users outlined',
  VERSACE = 'versace',
  VISA = 'visa',
  ZARA = 'zara'
}

export type IconType = (props: SVGIconProps) => React.ReactNode;

export const ICONS: Record<Icons, IconType> = {
  [Icons.APPLE_PAY]: IconApplePay,
  [Icons.ARROW_LEFT_OUTLINED]: IconArrowLeftOutlined,
  [Icons.ARROW_RIGHT_FILLED]: IconArrowRightFilled,
  [Icons.ARROW_RIGHT_OUTLINED]: IconArrowRightOutlined,
  [Icons.BELL_OUTLINED]: IconBellOutlined,
  [Icons.BOX_OUTLINED]: IconBoxOutlined,
  [Icons.CALVIN_KLEIN]: IconCalvinKlein,
  [Icons.CART]: IconCart,
  [Icons.CHEVRON_DOWN_OUTLINED]: IconChevronDownOutlined,
  [Icons.FACEBOOK]: IconFacebook,
  [Icons.GITHUB]: IconGithub,
  [Icons.GOOGLE_PAY]: IconGooglePay,
  [Icons.GUCCI]: IconGucci,
  [Icons.INSTAGRAM]: IconInstagram,
  [Icons.LOGOUT_OUTLINED]: IconLogoutOutlined,
  [Icons.MAIL]: IconMail,
  [Icons.MASTERCARD]: IconMastercard,
  [Icons.MORE_OUTLINED]: IconMoreOutlined,
  [Icons.PAYPAL]: IconPaypal,
  [Icons.PRADA]: IconPrada,
  [Icons.SEARCH]: IconSearch,
  [Icons.SLIDERS_OUTLINED]: IconSlidersOutlined,
  [Icons.SPARKLE]: IconSparkle,
  [Icons.TAG_FILLED]: IconTagFilled,
  [Icons.TRASH_FILLED]: IconTrashFilled,
  [Icons.TWITTER]: IconTwitter,
  [Icons.UPLOAD_OUTLINED]: IconUploadOutlined,
  [Icons.USER]: IconUser,
  [Icons.USERS_OUTLINED]: IconUsersOutlined,
  [Icons.VERSACE]: IconVersace,
  [Icons.VISA]: IconVisa,
  [Icons.ZARA]: IconZara
};
