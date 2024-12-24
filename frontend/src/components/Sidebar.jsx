import React, { useState } from "react";
import "./Sidebar.css";
// import Logo from "../images/logo.png";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [selected, setSelected] = useState(); //useState(0);

  const [expanded, setExpaned] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };
  console.log(window.innerWidth);
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          {/*<img src={Logo} alt="logo" />*/}
          <span style={{color:"navy"}}>
            Pump Master
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => setSelected(index)}
              >
                <item.icon />
                <a
                  href={`/${item.href}`}
                  style={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  <span>{item.heading}</span>
                </a>
              </div>
            );
          })}

          <div className="menuItem"></div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
