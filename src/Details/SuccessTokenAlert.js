import { motion } from "framer-motion";

const SuccessTokenAlert = ({ countdown }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="alert alert-error fixed right-10 top-10 w-[400px] bg-green-200 shadow-lg shadow-slate-900 "
    >
      <span className=" font-semibold text-background">✅ Token Verified</span>
    </motion.div>
  );
};

export default SuccessTokenAlert;
