import styles from "@/styles/views/event.module.scss";
//import { getScribblesDatabase } from "app/data";
//export const revalidate = 3600;
import Image from "next/image";
import type { Metadata } from "next/types";

import { logos } from "./eventLogo";
export const metadata: Metadata = {
	title: "Events",
	description: "Gallery of wolves",
};

export default function EventPage() {
	//const scribbles = await getScribblesDatabase();
	// postId = scribbles[0].id;
	//console.log(postId);

	/* const imgSRC = `https://www.notion.so/image/${encodeURIComponent(
    scribbles[0].pic ?? scribbles[0].Image,
  )}?table=block&id=${postId}`; */

	return (
		<>
			{logos?.map((l) => (
				<figure className={styles.figure} key={l.id}>
					<Image src={l.src} width={l.width} height={l.height} alt="drawing" className={styles.image} />
				</figure>
			))}
		</>
	);
}
