import React from "react";
import "./Hamburger.css";


const Hamburger = (props) => {
  return (
    <div className="hamburger" onClick={props.openSideBar}>
      <div className="lines"></div>
      <div className="lines"></div>
      <div className="lines"></div>
    </div>
  )
}

export default Hamburger
