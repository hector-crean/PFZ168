"use client";
// Photos from https://citizenofnowhe.re/lines-of-the-city
import { tree } from '@/routes';
import {
    MotionValue,
    motion,
    useScroll,
    useSpring,
    useTransform
} from "framer-motion";
import { useRef } from "react";
import styles from "./page.module.scss";

const useParallax = (value: MotionValue<number>, distance: number) => useTransform(value, [0, 1], [-distance, distance]);

interface SectionProps {
    name: string;
    heroImage: string;
}
const Section = ({ name, heroImage }: SectionProps) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);

    return (
        <section className={styles.section}>
            <div ref={ref}>
                <img src={heroImage} alt={`image-${heroImage}`} />
            </div>
            <motion.h2 style={{ y }}>{name}</motion.h2>
        </section>
    );
}

const TableOfContentsPage = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            {tree.map((node, i) => (
                <Section key={`section-${i}`} name={node.name} heroImage={node?.heroImage ?? ''} />
            ))}
            <motion.div className="progress" style={{ scaleX }} />
        </>
    );
}

export default TableOfContentsPage