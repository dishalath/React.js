import React, { Fragment } from "react";
import moment from "moment";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
const Footer = (props) => {
  return (
    <Fragment>
   
      <footer>
        <div className="container-fluid text-dark footer pt-5 mt-5 bg-success wow fadeIn" data-wow-delay="0.4s">
          <div className="container ">
            <div className="copyright   ">
              <div className="row pt-3 pt-3  d-flex justify-content-center">
                <div className="col-md-6 fs-4  ms-4  text-md-start mb-3 mb-md-0">
                  Develop  Feastful delights © Copyright {moment().format("YYYY")}
                </div>
              </div>
            </div>
          </div>
          <div className="container py-5">
            <div className="row g-5">
              <div className="col-lg-3 col-md-6">
                {/* <h4 className="text-light mb-4"> <img src={require('../img/logo.png')} alt="" /></h4> */}
                <p className="mb-2 fs-5">We are a team of designers and</p>
                <p className="mb-2 fs-5">developers that high quality</p>


                <div className="d-flex pt-2">
                  <a className="btn text-black bg-white mx-1 btn-social rounded-xl"><FaTwitter /></a>
                  <a className="btn text-black bg-white mx-1 btn-social rounded-xl"><FaFacebook /></a>
                  <a className="btn text-black bg-white mx-1 btn-social rounded-xl"><FaYoutube /></a>
                  <a className="btn text-black bg-white mx-1 btn-social rounded-xl"><FaLinkedin /></a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <h4 className="text-dark mb-4">My Account</h4>
                <li>Track Orders</li>
                <li>Shipping</li>
                <li>Wishlist</li>
                <li>My Account</li>
                <li>Order History</li>
                <li>Returns</li>
              </div>
              <div className="col-lg-3 col-md-6">
                <h4 className="text-dark mb-4">Infomation</h4>
                <li>Our Story</li>
                <li>Careers</li>
                <li>Careers</li>
                <li>Terms & Conditions</li>
                <li>Latest News</li>
                <li>Contact Us</li>
              </div>
              <div className="col-lg-3 col-md-6">
                <h4 className="text-dark mb-4">Talk To Us</h4>
                <span>Got Questions? Call us</span> <br />
                <h6 ><b>+2313 342 2343</b></h6>
                {/* <h5 className='py-2 fs-5'>manthan@gmail.com</h5> */}
                <div className="pt-2">
                  {/* <p>79 Sleepy HollowSt Jamaica, 
                         New York 1432</p> */}
                </div>

              </div>
            </div>
          </div>

        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
