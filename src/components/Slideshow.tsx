import { useState, useRef, useEffect, ReactNode, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./slideshow.module.scss";
import { Figure } from "./Figure";

export const wrap = (min: number, max: number, v: number) => {
	const rangeSize = max - min;
	return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity;
};

interface SlideshowProps {
	medias: Array<{ media: ReactNode; title: ReactNode; description: ReactNode }>;
}
const Slideshow = ({ medias }: SlideshowProps) => {
	const slideshowRef = useRef<HTMLDivElement>(null);

	const [[page, direction], setPage] = useState([0, 0]);
	const [inViewport, setInViewport] = useState<boolean>(false);

	// We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
	// then wrap that within 0-2 to find our image ID in the array below. By passing an
	// absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
	// detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
	const imageIndex = wrap(0, medias.length, page);

	const paginate = (newDirection: number) => {
		setPage([page + newDirection, newDirection]);
	};

	const { media, title, description } = useMemo(
		() => medias[imageIndex],
		[imageIndex],
	);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => setInViewport(entry.isIntersecting),
			{ threshold: 0 },
		);

		if (slideshowRef.current) {
			observer.observe(slideshowRef.current);
		}

		return () => {
			if (slideshowRef.current) {
				observer.unobserve(slideshowRef.current);
			}
		};
	}, [page]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (inViewport) {
				switch (event.key) {
					case "ArrowLeft":
						paginate(-1);
						break;
					case "ArrowRight":
						paginate(1);
						break;
					default:
						break;
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [page]);

	return (
		<div className={styles.slideshow_container} ref={slideshowRef}>
			<AnimatePresence initial={false} custom={direction}>
				<div className={styles.media_container}>
					<motion.div
						className={styles.responsive_media}
						key={page}
						custom={direction}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: "spring", stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 },
						}}
						drag="x"
						dragConstraints={{ left: 0, right: 0 }}
						dragElastic={1}
						onDragEnd={(e, { offset, velocity }) => {
							const swipe = swipePower(offset.x, velocity.x);

							if (swipe < -swipeConfidenceThreshold) {
								paginate(1);
							} else if (swipe > swipeConfidenceThreshold) {
								paginate(-1);
							}
						}}
					>
						<Figure media={media} caption={description} heading={title} />
					</motion.div>
				</div>
			</AnimatePresence>
			<div className={styles.next} onPointerDown={() => paginate(1)}>
				{"‣"}
			</div>
			<div className={styles.prev} onPointerDown={() => paginate(-1)}>
				{"‣"}
			</div>
		</div>
	);
};

export { Slideshow };
