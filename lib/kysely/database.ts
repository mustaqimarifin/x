import type { Generated } from "kysely";
import 'server-only'

interface User {
  id: Generated<number>
  name: string | null;
  email: string;
  emailVerified: Date | string | null;
  image: string | null;
}

interface Account {
  id: Generated<number>
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
  oauth_token_secret: string | null;
  oauth_token: string | null;
}

interface Session {
  id: Generated<number>

  userId: string;
  sessionToken: string;
  expires: Date | string;
}

interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date | string;
}

export interface Database {
  User: User;
  Account: Account;
  Session: Session;
  VerificationToken: VerificationToken;
}
