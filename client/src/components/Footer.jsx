import React from "react";
import footlogo from "../assets/footer_logo.svg";
import facebook from "../assets/Facebook.svg";
import instagram from "../assets/Instagram.svg";
import youtube from "../assets/Youtube.svg";
import linkedin from "../assets/LinkedIn.svg";
import x from "../assets/X.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Logo */}
        <img src={footlogo} alt="Footer Logo" className="h-12" />

        {/* Social Icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <img src={facebook} alt="Facebook" className="h-6 cursor-pointer" />
          <img src={instagram} alt="Instagram" className="h-6 cursor-pointer" />
          <img src={youtube} alt="YouTube" className="h-6 cursor-pointer" />
          <img src={linkedin} alt="LinkedIn" className="h-6 cursor-pointer" />
          <img src={x} alt="Twitter/X" className="h-6 cursor-pointer" />
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-700 my-4" />

      {/* Bottom Section */}
      <div className="text-center text-sm">
        <p>© 2025 Shiwans Vaishya. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
