export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  brand_id: number;
  gender: string[];
  size: string[];
  color: string[];
  /** Newly picked image file, if the user chose one. */
  image?: File;
}

/** Values used to pre-fill the form when updating an existing product. */
export type ProductFormInitialValues = Omit<ProductFormValues, 'image'> & {
  product_image?: string;
};

export interface CreateProductFormProps {
  brands: { id: number; brand_name: string }[];
  initialValues?: ProductFormInitialValues;
  submitLabel?: string;
  onSubmit: (values: ProductFormValues) => void;
  onDiscard: () => void;
}
