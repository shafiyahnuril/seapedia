import "next-auth";

// ─── NextAuth type extensions ──────────────────────────────
// JWT augmentation dilakukan di auth.ts karena next-auth/jwt tidak
// tersedia sebagai modul terpisah di Auth.js v5

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string | null;
      roles: string[];
      activeRole: string;
    };
  }

  interface User {
    roles?: string[];
    activeRole?: string;
  }
}

// ─── API response wrapper ───────────────────────────────────
export type ApiResponse<T = unknown> = {
  data?: T;
  error?: string;
  message?: string;
};

// ─── Business constants ─────────────────────────────────────
export const DELIVERY_FEES = {
  INSTANT: 25000,
  NEXT_DAY: 15000,
  REGULAR: 10000,
} as const;

export const SLA_DAYS = {
  INSTANT: 1,
  NEXT_DAY: 2,
  REGULAR: 5,
} as const;

export const DRIVER_EARNING_PERCENT = 0.7;
export const TAX_RATE = 0.12;

// ─── Extended Prisma types (aktif setelah prisma generate) ──
// Akan diimport dari "@/generated/prisma" setelah prisma generate dijalankan.
// Contoh:
//   import type { Product, Store, Order, OrderItem, OrderStatusHistory }
//     from "@/generated/prisma";
//   export type ProductWithStore = Product & { store: Store };
