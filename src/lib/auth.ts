import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validations";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });
        if (!user) return null;

        const valid = await bcrypt.compare(parsed.data.password, user.password);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.username,
          roles: user.roles as string[],
          activeRole: (user.roles as string[])[0],
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.roles = (user as { roles?: string[] }).roles ?? [];
        token.activeRole =
          (user as { activeRole?: string }).activeRole ??
          ((user as { roles?: string[] }).roles ?? [])[0] ??
          "BUYER";
      }
      // Digunakan saat client memanggil update({ activeRole })
      if (trigger === "update" && (session as { activeRole?: string })?.activeRole) {
        token.activeRole = (session as { activeRole: string }).activeRole;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.roles = (token.roles as string[]) ?? [];
      session.user.activeRole = (token.activeRole as string) ?? "BUYER";
      return session;
    },
  },
});
