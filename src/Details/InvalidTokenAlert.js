import { motion } from "framer-motion";

const InvalidTokenAlert = ({ countdown }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="alert alert-error fixed top-10 w-3/4  bg-red-200 shadow-lg shadow-slate-900 "
    >
      <span className=" font-semibold text-background">
        ❌ Invalid Token - Redirecting to home in {countdown} seconds
      </span>
    </motion.div>
  );
};

export default InvalidTokenAlert;
