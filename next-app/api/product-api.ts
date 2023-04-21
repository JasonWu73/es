import { AxiosRequest } from '@/hooks/use-http';

export interface Product {
  id?: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsPagination {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const BASE_URL = 'https://dummyjson.com';

export function getProductsApi(pageNumber: number, pageSize: number): AxiosRequest {
  return {
    method: 'get',
    url: `${BASE_URL}/products`,
    params: {
      limit: pageSize,
      skip: (pageNumber - 1) * pageSize,
    },
  };
}

export function getProductApi(productId: number): AxiosRequest {
  return {
    method: 'get',
    url: `${BASE_URL}/products/${productId}`,
  };
}

export function addProductApi(product: Product): AxiosRequest {
  return {
    method: 'post',
    url: `${BASE_URL}/products/add`,
    data: product,
  };
}

export function updateProductApi(product: Product): AxiosRequest {
  return {
    method: 'put',
    url: `${BASE_URL}/products/${product.id}`,
    data: product,
  };
}

export function deleteProductApi(productId: number): AxiosRequest {
  return {
    method: 'delete',
    url: `${BASE_URL}/products/${productId}`,
  };
}
