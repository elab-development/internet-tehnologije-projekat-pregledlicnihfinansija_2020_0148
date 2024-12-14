import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullPageHeight = document.body.clientHeight;
      const footerHeight = document.querySelector(".footer").clientHeight;

      setIsVisible(scrollY + viewportHeight >= fullPageHeight - footerHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className={`footer ${isVisible ? "visible" : ""}`}>
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Your Finance App</p>
        <ul>
          <li>
            <a href="/">About Us</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
