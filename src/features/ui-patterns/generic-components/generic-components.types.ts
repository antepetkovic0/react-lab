export type User = {
  id: string;
  name: string;
  role: string;
};

export type Product = {
  sku: string;
  title: string;
  price: number;
};

export type GenericColumn<T> = {
  key: keyof T;
  heading: string;
};
