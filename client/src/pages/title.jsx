import { AnimatePresence, motion } from "framer-motion";
import styles from '@/styles/Home.module.css'
const Title = () => {
    const letters = "Almanac".split("");
  
    return (
      <motion.h1 id={styles.title}>
        <AnimatePresence>
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {letter}
            </motion.span>
          ))}
        </AnimatePresence>
      </motion.h1>
    );
  };

  export default Title;
  