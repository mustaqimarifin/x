import { cx } from "lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cx(
        "h-5 w-2/5 animate-pulse rounded-lg bg-slate-100",
        className
      )}
      {...props}
    />
  );
}
