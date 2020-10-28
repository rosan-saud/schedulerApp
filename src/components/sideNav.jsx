import React from "react";
import Logo from "../images/logo_icon.svg";
import Option from "../images/option_icon.svg";

function SideNav() {
  return (
    <div className="sidenav">
      <h1 style={{ marginLeft: 75 }} className="logo">
        <img src={Logo} width="50px" />
        <span style={{ color: "#dc6f8a" }}>Logo</span>
      </h1>
      <div className="nav">
        <div className="nav-options">
          <img src={Option} /> <span> Option one</span>
        </div>

        <div className="nav-options">
          <img src={Option} /> <span> Option two</span>
        </div>

        <div className="nav-options">
          <img src={Option} /> <span> Option thr</span>ee
        </div>

        <div className="nav-options">
          <img src={Option} /> <span> Option four</span>
        </div>
      </div>
    </div>
  );
}
export default SideNav;
