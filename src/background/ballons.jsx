// src/Balloons.js
import React from "react";
import { motion } from "framer-motion";
import "./Ballons.css";
import balloon1 from "./images/b1.png";
import balloon2 from "./images/b2.png";
import balloon3 from "./images/b3.png";
import balloon4 from "./images/b4.png";
import balloon5 from "./images/b5.png";

const Balloons = () => {
  const balloons = [
    { id: 1, delay: 0, src: balloon1, left: "10%" },
    { id: 2, delay: 2, src: balloon2, left: "30%" },
    { id: 3, delay: 4, src: balloon3, left: "50%" },
    { id: 4, delay: 6, src: balloon4, left: "70%" },
    { id: 5, delay: 8, src: balloon5, left: "55%" },
  ];

  return (
    <div className="balloons">
      {balloons.map((balloon) => (
        <motion.img
          key={balloon.id}
          className="balloon"
          src={balloon.src}
          alt={`Balloon ${balloon.id}`}
          style={{ left: balloon.left }}
          initial={{ y: "100vh", opacity: 1 }}
          animate={{ y: "-120vh", opacity: 0 }}
          transition={{
            duration: 10,
            delay: balloon.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default Balloons;
