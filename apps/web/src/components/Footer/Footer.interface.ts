export interface FooterProps {
  brandName?: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}
