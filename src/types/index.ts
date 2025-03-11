export interface Product {
    id: number;
    title?: string;
    description?: string;
    price?: number;
    discountPercentage?: number;
    brand?: string;
    category?: string;
    rating?: number;
    thumbnail?: string;
}

export interface ApiProduct {
    id: number;
    title?: string;
    description?: string;
    price?: number;
    discountPercentage?: number;
    brand?: string;
    category?: string;
    rating?: number;
    thumbnail?: string;
}

export interface ApiResponse {
    products: ApiProduct[];
    total?: number;
}