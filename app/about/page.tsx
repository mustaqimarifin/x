import { Balancer } from "react-wrap-balancer";

export default function AboutPage() {
  return (
    <section>
      <h1 className="mb-4 max-w-[650px] font-serif text-3xl font-bold">
        <Balancer>About</Balancer>
      </h1>

      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        This is my about page.
      </p>
    </section>
  );
}
