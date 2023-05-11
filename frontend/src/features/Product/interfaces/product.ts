export interface Product {
  id: number;
  categoryId: number;
  subcategoryId: number;
  name: string;
  price: number;
  unitPrice: number;
  unitQuantity: string;
  inStock: number;
  details: string | null;
}
