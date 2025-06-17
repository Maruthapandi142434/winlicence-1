import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../styles/Stats.module.css";
import { FaBarsProgress, FaRegThumbsUp, FaRegUser, FaRegHeart } from "react-icons/fa6"; // Importing icons

const Counter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    let duration = 2000; // 2 seconds
    let stepTime = Math.abs(Math.floor(duration / end));

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {count}
    </motion.span>
  );
};

const StatsSection = () => {
  const stats = [
    { icon: <FaBarsProgress />, label: "Projects Complete", value: 500 },
    { icon: <FaRegThumbsUp />, label: "Happy Clients", value: 500 },
    { icon: <FaRegUser />, label: "Total Users", value: 500 },
    { icon: <FaRegHeart />, label: "Likes", value: 500 },
  ];

  return (
    <div className={styles.statsContainer}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.statCard}>
          <span className={styles.icon}>{stat.icon}</span>
          <div className="counter-con">
            <h2 className="text-left">
              <Counter value={stat.value} />
            </h2>
            <p>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
