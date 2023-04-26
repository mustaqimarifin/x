/* eslint-disable @typescript-eslint/no-empty-interface */
import { AuthedKysely } from "@next-auth/kysely-adapter";
import NextAuth, { DefaultSession, Session } from "next-auth";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** HOKAGE */
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
    isAdmin: boolean;
    userId: string;
  }

  interface User extends AuthedKysely {}
}
