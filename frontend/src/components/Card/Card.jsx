import React, { useState,Link } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

import fuel from "./fuel.json";
import home from "./home.json";
import Lottie from "lottie-react";

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimateSharedLayout>
      <CompactCard param={props}/>
    </AnimateSharedLayout>
  );
};

// Compact Card
function CompactCard({ param }) {
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: "lightseagreen",
        boxShadow: "rgb(224 198 245) 0px 10px 20px 0px",
      }}
    >
      <div className="radialBar">
        {
          param.title === "Pump Master Dashboard" && (<Lottie animationData={home} style={{marginRight:"2rem",width:'5rem'}}/>)
        }      
        {
          param.title === "Fuel sale data" && (<Lottie animationData={fuel} style={{marginLeft:'-1.5rem',
            width:'8rem', display:"block",overflow:"hidden"}}/>)
        }
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <span></span>
        <a  href={`/${param.value}`} style={{ textDecoration: 'none', fontWeight:'bold' }}><span>More Info</span></a>
      </div>
    </motion.div>
  );
}

export default Card;
