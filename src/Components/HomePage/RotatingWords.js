//-----------Libaries-----------//
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const RotatingWords = ({ words }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [words.length]);

  const wordVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="m-2 ml-8 flex w-[420px] flex-row">
      <h1 className="mr-2 text-[2em] text-text">Manage your</h1>
      <motion.h1
        className="mr-2 text-[2em] text-primary"
        key={index}
        variants={wordVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
      >
        {words[index]}
      </motion.h1>
    </div>
  );
};

export default RotatingWords;
