import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './skip.module.scss';

interface SkipProps {
    skipHref: string;
    skipAvailable: boolean;
}
const Skip = ({ skipAvailable, skipHref }: SkipProps) => {



    return (skipAvailable ? <motion.div className={styles.skip}><Link href={skipHref}>Skip</Link></motion.div> : null)
}

export { Skip };
