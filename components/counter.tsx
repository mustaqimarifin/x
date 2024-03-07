export default function ViewCounter({
  slug,
  allViews,
}: {
  slug: string;
  allViews: {
    slug: string;
    view_count: number;
  }[];
  trackView?: boolean;
}) {
  const viewsForSlug = allViews?.find((view) => view.slug === slug);
  const number = viewsForSlug?.view_count || 0;

  return (
    <p className="text-neutral-600 dark:text-neutral-400">{`${number} views`}</p>
  );
}
