import React, { useState, useRef } from "react";
import NavBar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import SignIn from './SignIn';
import "./login.css";
import "./signin.css";

function Login() {

  const [signIn,setSignIn] = useState(false);
  const emailRef = useRef('');


  return (
    <div className="loginScreen">
      <NavBar isSignUpScreen onSignIn={!signIn ? () => setSignIn(true): () => setSignIn(false)}></NavBar>
           {!signIn ? (
                   <div className="banner_content__center jumpIn">
                   <div className="banner-center">
                     <h1 className="headline__login">
                       Unlimited movies, TV shows, and more.
                     </h1>
                     <h3 className="headline__login__h3">
                       Watch anywhere. Cancel anytime.
                     </h3>
                     <h3 className="headline__login__h3_2">
                       Ready to watch? Enter your email to create or restart your
                       membership.
                     </h3>
                   </div>
                   <div className="login_div">
                     <input
                       type="email"
                       name=""
                       id="email__input"
                       className="inpit__field-Mail"
                       placeholder="Email address"
                       ref={emailRef}
                     />
                     <button className="button-get-started" onClick={signIn ? () => setSignIn(true): () => setSignIn(true)}>
                       Get started
                       <FontAwesomeIcon icon={faChevronRight} className="chevronRight"></FontAwesomeIcon>
                     </button>
                   </div>
                 </div>
           ):(
            <div className="banner_content__center">
             <SignIn email={emailRef.current.value} ></SignIn>
             </div>
           )}
      <div className="login__gradient"></div>
    </div>
  );
}

export default Login;
