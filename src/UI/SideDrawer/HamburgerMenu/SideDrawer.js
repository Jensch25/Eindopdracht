import React from "react"
import NavItems from "../../../components/NavigationBar/NavItems";
import "./SideDrawer.css"

  const SideDrawer = ({ show, handler }) => {
    return (
      <div
          className="drawer"
          style={{ transform: show ? "translateX(0%)" : "translateX(-110%)" }}
      >
        <NavItems />
        <div onClick={handler} className="closeBtn" />
      </div>
  )
}

export default SideDrawer
