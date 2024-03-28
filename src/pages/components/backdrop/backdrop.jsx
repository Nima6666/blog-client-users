import { motion } from "framer-motion";

export default function Backdrop({ children, onClick }) {
    return (
        <motion.div
            className="fixed top-0 left-0 h-[100vh] w-[100vw] bg-[#00000080] flex justify-center items-center z-50 bg-blur"
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
}
