export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number | null; // null если "цена по запросу"
  images: string[];
  packaging: string; // фасовка
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}
