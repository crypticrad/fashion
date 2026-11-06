export interface AdminBrand {
  id: number;
  brand_name: string;
}

export interface AdminProduct {
  id: number;
  name: string;
  description: string;
  product_image: string;
  brand_id: number;
  gender: string[];
  color: string[];
  size: string[];
  price: number;
  style: string;
  category: string;
}

export interface ProductsTableProps {
  products: AdminProduct[];
  brands: AdminBrand[];
  onAdd: () => void;
  onEdit: (product: AdminProduct) => void;
  onDelete: (product: AdminProduct) => void;
}
