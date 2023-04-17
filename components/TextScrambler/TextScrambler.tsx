import { useReducedMotion } from "framer-motion";
import { useInterval, useMounted } from "lib/hooks";
import * as React from "react";

import * as styles from "./TextScrambler.css";
import { getScrambledState } from "./utils";

/**
 * TextScrambler
 *
 * @see https://www.nan.fyi/experiments/scrambled-text
 */

interface TextScramblerProps {
  children: string;
  /**
   * The speed at which to reveal the characters
   * @default 0.5
   */
  speed?: number;
}

const TextScrambler = ({ children, speed = 0.5 }: TextScramblerProps) => {
  const mounted = useMounted();
  const shouldReduceMotion = useReducedMotion();
  const size = children.length;

  const [[unscrambled, scrambled], setScrambledText] = React.useState(
    getScrambledState(children, size, 0)
  );
  const [count, increment] = React.useReducer((state) => state + 1, 0);
  const finished = count > size;

  useInterval(
    () => {
      increment();
      setScrambledText(getScrambledState(children, size, count));
    },
    finished ? null : 30 / speed
  );

  if (mounted && shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <span className={styles.root}>
      <span className={styles.placeholder}>{children}</span>
      {mounted ? (
        <span className={styles.scrambled} aria-hidden={true}>
          {unscrambled}
          {scrambled}
        </span>
      ) : null}
    </span>
  );
};

export { TextScrambler };
