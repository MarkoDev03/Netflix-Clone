import React, {  useState, useEffect } from "react";
import Logo from "./netflix-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Search } from 'react-bootstrap-icons';
import { faRss, faSortDown } from "@fortawesome/free-solid-svg-icons";
import Headline from "./netflix-headline.png";
import { Link } from "react-router-dom";
import {auth} from './Firebase'
import "./nav.css";
import "./Navbar.css";

const links = [
  { title: "Home",to:"/" },
  { title: "Tv Shows",to:'/browse/tv-shows' },
  { title: "Movies",to:'/browse/movies' },
  { title: "New&Popular",to:'/browse/new&popular' },
  { title: "My List",to:'/browse/my-list' },
];
function Navbar({ isSignUpScreen, onSignIn, username, isProfile }) {
  const [show, handleShow] = useState(false);
 

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    
    });

    return () => {
      handleShow(false);
    }
  }, []);

  return (
    <div
      className={`navbar ${show && "nav_blacks"} `}
      style={{ position: "fixed", top: "0px" }}
    >
      <div className='set-wdth'>
      <div className="left-hand">
        {window.innerWidth < 900 ? (
          <Link to="/home">
            <img src={Logo} className="netflix-img" alt="" />
          </Link>
        ) : (
          <Link to="/home">
            <img src={Headline} className="headline-height" alt="" />
          </Link>
        )}
        {!isSignUpScreen
          ? links.map((link) => (
              <Link
                key={link.title}
                className="link"
                to={link.to}
              >
                {link.title}
              </Link>
            ))
          : ""}
      </div>
      {!isSignUpScreen ? (
        <div className="right-hand">
          <FontAwesomeIcon icon={faRss} style={{opacity:'0'}} />
          <Link to="/search" style={{color:'white'}}>
          <Search size={24} color='white' />
          </Link>
          <div className="user">
            <Link to={`/profile/${username}/settings`}>
              <img
                src={auth.currentUser ? auth.currentUser.photoURL : ""}
                className="whoswathcing"
                width={30}
                height={30}
                alt=""
              />
            </Link>
            <FontAwesomeIcon icon={faSortDown} className="switch" />
          </div>
        </div>
      ) : (
        <button className="sign-up" onClick={onSignIn}>
          Sign In
        </button>
      )}
      </div>
       {!isSignUpScreen  && window.innerWidth < 900 && !isProfile ? (
        <header className='set-wdth-links'>
        <Link to={`/browse/tv-shows`} className="linkhref">
          Tv Shows
        </Link>
        <Link to={`/browse/movies`} className="linkhref">
          Movies
        </Link>
        <Link to={`/browse/my-list`} className="linkhref">
          My List
        </Link>
      </header>
      ) : (
        ""
      )}
    </div>
  );
}
export default Navbar;
