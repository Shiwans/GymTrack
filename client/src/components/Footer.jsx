import React from "react";
import footlogo from "../assets/footer_logo.svg";
import facebook from "../assets/Facebook.svg";
import instagram from "../assets/Instagram.svg";
import youtube from "../assets/Youtube.svg";
import linkedin from "../assets/LinkedIn.svg";
import x from "../assets/X.svg";

const Footer = () => {
  return (
    <>
      {/* <img class="" src={footlogo}></img> */}
      <div class="flex gap-95">
        <img src={footlogo}></img>
        <div class="flex gap-10">
          <img src={facebook}></img>
          <img src={facebook}></img>
          <img src={facebook}></img>
          <img src={facebook}></img>
          <img src={facebook}></img>
        </div>
      </div>
      <hr></hr>
      <div className="flex">
        <h3>2025 Shiwans Vaishya. All rights reserved</h3>
        <h3>Privacy Policy</h3>
        <h3>Terms and Condition</h3>
      </div>
    </>
  );
};

export default Footer;
