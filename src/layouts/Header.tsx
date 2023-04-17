import { NavigationMenuImpl } from "@/components/navigation-menu";
import { Tree } from "@/models/tree";
import PfizerIcon from '@/svg/pfizer';
import {
    motion,
    useScroll,
    useSpring
} from "framer-motion";
import Link from "next/link";
import styles from './header.module.scss';



interface HeaderProps {
    nodes: Tree;
    activePathname: string;

}
const Header = ({ nodes, activePathname }: HeaderProps) => {

    // const containerRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });


    return (
        <motion.header
            className={styles.header}
            variants={{
                visible: { top: "0px" },
                hidden: { top: "-100px" }
            }}

        >
            <div className={styles.header_nav}>
                <div className={styles.home}>
                    <Link className={styles.home_link} href={'/sections'} passHref><PfizerIcon /></Link>
                </div>

                <nav className={styles.site_navigation}>
                    <NavigationMenuImpl nodes={nodes} activePathname={activePathname} />
                </nav>
                <div className={styles.search}></div>
            </div>
            <motion.hr className={styles.progress_bar} style={{ scaleX }} />
        </motion.header>
    );
}

export { Header };
