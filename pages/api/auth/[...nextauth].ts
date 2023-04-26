import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import GithubProvider from "next-auth/providers/github";
import { KyselyAdapter } from "lib/kysely";
import { db } from "lib/kysely/postgres";

export const authOptions: NextAuthOptions = {
  adapter: KyselyAdapter(db as any),

  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0", // opt-in to Twitter OAuth 2.0
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  /*    callbacks: {
    async session ({ token, session }) {
      if (token) {
        session.user.id = token.sub
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt ({ token, user }) {
      const dbUser = await db
        .selectFrom('User')
        .selectAll()
        .where("id", "=", user.id)
        .executeTakeFirst()


      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },  */
  callbacks: {
    /*     async signIn({ account, profile, user }) {
      if (account.provider === 'twitter') {
        profile.sub = user.id
      }
      return true // Do different verification for other providers that don't have `email_verified`
    }, */

    async session({ session, user }) {
      session.user.id = user.id;

      return session;
    },
  },
};

export default NextAuth(authOptions);
