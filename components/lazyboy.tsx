import NextImage from "next/image";
import { Suspense } from "react";

import { cx } from "@/lib/utils";

const Image = (props: any) => {
	return (
		<Suspense>
			<figure>
				<NextImage {...props} className={cx(props.className, "rounded-lg dark:bg-titan-950 bg-zinc-50")} />
			</figure>
		</Suspense>
	);
};

export default Image;
