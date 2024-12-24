import React from "react";
import Cards from "../Cards/Cards";
import "./MainDash.css";
import moment from "moment";

const greetings = () => {
  let greeting;
  const currentTime = moment(); // create a moment object with the current time
  const hours = currentTime.hours(); // get the hours from the moment object
  if (hours >= 5 && hours < 12) {
    greeting = "Good morning";
  } else if (hours >= 12 && hours < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return greeting;
};
const MainDash = () => {
  return (
    <div className="MainDash">
      <h1 style={{ margin: "1rem" }}>Dashboard</h1>

      <div className="clockTitle">
        <span>
          {moment().format("dddd")},{moment().format("MMMM")}{" "}
          {moment().format("D")}
        </span>
      </div>
      <div className="greet" style={{color:"navy"}}>
        <span>{greetings()}</span>
      </div>
      <Cards />
    </div>
  );
};

export default MainDash;
