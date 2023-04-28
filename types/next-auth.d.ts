/* eslint-disable @typescript-eslint/no-empty-interface */
import { AuthedKysely } from "@next-auth/kysely-adapter"
import NextAuth, { DefaultSession, DefaultUser, Session } from "next-auth"
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** HOKAGE */
      id: string | number
      role: UserRole
    } & DefaultSession["user"]
    isAdmin: boolean
    userId: string | number
  }

  interface User extends DefaultUser { }
}
