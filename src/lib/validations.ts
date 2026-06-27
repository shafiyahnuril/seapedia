import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  roles: z
    .array(z.enum(["BUYER", "SELLER", "DRIVER"]))
    .min(1, "Pilih minimal satu role"),
});

export const storeSchema = z.object({
  name: z.string().min(2, "Nama toko minimal 2 karakter"),
  description: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  description: z.string().optional(),
  price: z.number().positive("Harga harus lebih dari 0"),
  stock: z.number().int().min(0, "Stok tidak boleh negatif"),
  imageUrl: z.url("URL gambar tidak valid").optional().or(z.literal("")),
});

export const addressSchema = z.object({
  label: z.string().min(1, "Label alamat wajib diisi"),
  street: z.string().min(1, "Alamat jalan wajib diisi"),
  city: z.string().min(1, "Kota wajib diisi"),
  province: z.string().min(1, "Provinsi wajib diisi"),
  postalCode: z.string().min(5, "Kode pos minimal 5 karakter"),
  isDefault: z.boolean().optional(),
});

export const topupSchema = z.object({
  amount: z.number().positive("Jumlah topup harus lebih dari 0"),
});

export const cartItemSchema = z.object({
  productId: z.string().min(1, "productId wajib diisi"),
  quantity: z.number().int().min(1, "Quantity minimal 1"),
});

export const checkoutSchema = z.object({
  addressId: z.string().min(1, "Alamat pengiriman wajib dipilih"),
  deliveryMethod: z.enum(["INSTANT", "NEXT_DAY", "REGULAR"]),
  voucherCode: z.string().optional(),
  promoCode: z.string().optional(),
});

export const reviewSchema = z.object({
  reviewerName: z.string().min(1, "Nama wajib diisi"),
  rating: z.number().int().min(1, "Rating minimal 1").max(5, "Rating maksimal 5"),
  comment: z.string().min(1, "Komentar wajib diisi"),
});

export const voucherSchema = z.object({
  code: z.string().min(1, "Kode voucher wajib diisi"),
  discountPercent: z.number().positive("Diskon harus lebih dari 0").max(100, "Diskon maksimal 100%"),
  maxDiscount: z.number().positive("Maksimal diskon harus lebih dari 0").optional(),
  usageLimit: z.number().int().positive("Kuota harus lebih dari 0"),
  expiresAt: z.string().min(1, "Tanggal kadaluarsa wajib diisi"),
});

export const promoSchema = z.object({
  code: z.string().min(1, "Kode promo wajib diisi"),
  discountPercent: z.number().positive("Diskon harus lebih dari 0").max(100, "Diskon maksimal 100%"),
  maxDiscount: z.number().positive("Maksimal diskon harus lebih dari 0").optional(),
  expiresAt: z.string().min(1, "Tanggal kadaluarsa wajib diisi"),
});

export const switchRoleSchema = z.object({
  activeRole: z.enum(["ADMIN", "BUYER", "SELLER", "DRIVER"]),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type StoreInput = z.infer<typeof storeSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type TopupInput = z.infer<typeof topupSchema>;
export type CartItemInput = z.infer<typeof cartItemSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type VoucherInput = z.infer<typeof voucherSchema>;
export type PromoInput = z.infer<typeof promoSchema>;
export type SwitchRoleInput = z.infer<typeof switchRoleSchema>;
