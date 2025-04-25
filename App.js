import React, { Fragment, useReducer } from "react";
import Routes from "./components";
import { LayoutContext, layoutState, layoutReducer } from "./components/shop";
import { IoLogoWhatsapp } from "react-icons/io";
import "./app.css";
function App() {
  const [data, dispatch] = useReducer(layoutReducer, layoutState);
  return (
    <Fragment>
      <LayoutContext.Provider value={{ data, dispatch }}>
        <Routes />

        <a
          href="https://wa.me/919714170273?text=Hello How Can I hepl you ?"
          target="_blank"
          rel="noopener noreferrer"
          className="textDecoration"
        >
          <IoLogoWhatsapp className=" wpIcon" />
        </a>
        {/* </IoLogoWhatsapp> */}
      </LayoutContext.Provider>
    </Fragment>
  );
}

export default App;
