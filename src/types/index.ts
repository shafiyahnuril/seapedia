export type Role = "BUYER" | "SELLER" | "ADMIN";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  sellerId: string;
  imageUrl?: string;
  createdAt: Date;
};

export type Order = {
  id: string;
  buyerId: string;
  sellerId: string;
  totalAmount: number;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: Date;
};

export type CartItem = {
  productId: string;
  quantity: number;
  product: Product;
};

export type Voucher = {
  id: string;
  code: string;
  discountPercent: number;
  maxDiscount?: number;
  expiresAt: Date;
};
