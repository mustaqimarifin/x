import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;
export type Role = "BLOCKED" | "USER" | "ADMIN";
export type Account = {
  id: Generated<string>;
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
};
export type Comment = {
  id: Generated<number>;
  text: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp | null;
  userId: string | null;
  parentId: string | null;
  slug: string | null;
};
export type Guestbook = {
  id: Generated<number>;
  userId: string | null;
  body: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type Like = {
  userId: string;
  commentId: string;
};
export type Post = {
  id: Generated<number>;
  slug: string | null;
  count: Generated<number>;
};
export type Session = {
  id: Generated<string>;
  sessionToken: string;
  userId: string;
  expires: Timestamp;
};
export type User = {
  id: Generated<string>;
  role: Generated<Role>;
  name: string;
  email: string | null;
  emailVerified: Timestamp | null;
  isAdmin: Generated<boolean>;
  image: string | null;
};
export type VerificationToken = {
  identifier: string;
  token: string;
  expires: Timestamp;
};
export type DB = {
  Account: Account;
  Comment: Comment;
  Guestbook: Guestbook;
  Like: Like;
  Post: Post;
  Session: Session;
  User: User;
  VerificationToken: VerificationToken;
};
