export interface ProductImportRow {
  name: string;
  description?: string;
  brand_id: number;
  gender: string[];
  color: string[];
  size: string[];
  price: string;
  style: string;
  category: string;
}

export interface UploadFormProps {}
