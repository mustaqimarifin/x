"use client";

import type { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

export const Fade = ({ children }: { children: ReactNode }) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		//rootMargin: '-100px 0px',
		threshold: 0.2,
	});

	return (
		<div
			suppressHydrationWarning
			ref={ref}
			className={`transition-all duration-500 ${
				inView ? "fade-in blur-0 opacity-100  " : "fade-out blur-md  opacity-0"
			}`}
		>
			{children}
		</div>
	);
};
