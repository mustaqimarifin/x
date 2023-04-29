
import { Chat } from "components/Misc/Chat"
import { Timeline } from "components/Misc/timeline"
import Balancer from "react-wrap-balancer";

export default function AboutPage() {
  return (
    <section>
      <h1 className="mb-4 max-w-[650px] font-serif text-3xl font-bold">
        <Balancer>About</Balancer>
      </h1>
      <Chat />

      <Timeline />
      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        This is my about page.
      </p>
    </section>
  );
}
