import { AnimatePresence, motion } from "framer-motion";

const Pencil = () => {
    <motion.img
    src="/fountain-pen.png"
    alt="pencil"
    id="pencil"
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{ duration: 5 }}
    
    />
}

export default Pencil;


