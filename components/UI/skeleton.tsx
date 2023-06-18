type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div className="fixed left-0 top-0 z-50 block h-full w-full bg-white opacity-75">
      <span className="relative top-1/2 mx-auto my-0 block h-0 w-0 text-green-500 opacity-75">
        <i className="fas fa-circle-notch fa-spin fa-5x"></i>
      </span>
    </div>
  );
}
