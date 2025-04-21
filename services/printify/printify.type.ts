export interface ProductVariant {
    id: string;
    title: string;
    price: number;
    is_enabled: boolean;
    sku: string;
  }
  
  export interface Product {
    id: string;
    title: string;
    description: string;
    variants: ProductVariant[];
    images: {
      src: string;
      position: number;
    }[];
    created_at: string;
    updated_at: string;
  }
  
  export interface CreateOrderInput {
    productId: string;
    variantId: string;
    quantity: number;
  }