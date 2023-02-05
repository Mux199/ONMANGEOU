import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer">
    <Link to={"/faq"}>
      <button>FAQ</button>
    </Link>
  </footer>
);

export default Footer;
