import React from "react";
import Navber from "./Navber";
import Footer from "./Footer";
import Contact from "./Contact";
import { IoLogoWhatsapp } from "react-icons/io";
export const MainContact = () => {
  return (
    <>
      <Navber />
      {/* <div className="">
        <div className="  ">
          <a
            href="https://wa.me/919925334834?text=Hello How Can I hepl you ?"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoWhatsapp className="h1 position-static bottom-0 left-" />
          </a>
        </div>
      </div> */}
      
            
      <Contact />
      <Footer />
    </>
  );
};
