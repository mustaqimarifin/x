"use client";
import Avatar from "./Avatar";
import { formatDate } from "lib/utils";

export const Message = ({ post }) => {
  return (
    <article className="rounded-lg bg-white p-6 text-base dark:bg-gray-900">
      <footer className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <p className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
            <Avatar
              className="mr-2 h-6 w-6 rounded-full"
              src={post.user.image}
              alt="Michael Gough"
            />
            {post.user.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatDate(post.createdAt)}
          </p>
        </div>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{post?.body}</p>
    </article>
  );
};
