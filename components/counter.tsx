export default function ViewCounter({ views }) {
  const number = views || 0;
  return (
    <p className="text-neutral-600 dark:text-neutral-400">{`${number} views`}</p>
  );
}
