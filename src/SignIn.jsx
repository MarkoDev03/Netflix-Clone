import React, { useRef, useState } from "react";
import { auth } from "./Firebase";
import { database } from "./Firebase";
import "./signin.css";
import "./login.css";
import { useHistory } from "react-router";

var time = new Date();

sessionStorage.setItem("time", time);

function SignIn({ email, signUp }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const history = useHistory();
  const [using, setUsing] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(false);

  if (signUp) {
    setUsing(false);
  }

  const register = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
          
        history.push("/profile/" + authUser.user.uid + "/settings");

        var context,
          fullname = authUser.user.email.slice(0, -10);

        if (fullname.includes(".")) {
          context = fullname.replace(/\./g, " ");
        } else if (fullname.includes("#")) {
          context = fullname.replace(/#/g, " ");
        } else if (fullname.includes("[")) {
          context = fullname.replace(/\[/g, " ");
        } else if (fullname.includes("$")) {
          context = fullname.replace(/\$/g, " ");
        } else {
          context = fullname;
        }

        database.ref("accounts/" + context).set({
          username: authUser.user.email.slice(0, -10),
          email: emailRef.current.value,
          password: passwordRef.current.value,
          time: sessionStorage.getItem("time"),
        });
      })
      .catch((error) => {
       setError(true)
       setMessage(error.message)
      });
  };

  const createAccount = () => {
    setUsing(true);
  };

  const resetPassword = () => {
    auth.sendPasswordResetEmail(emailRef.current.value).then(() => {
      setError(true)
      setMessage("Email sent to " + emailRef.current.value)
    }).catch((error) => {
       setError(true)
       setMessage(error.message)
    })
  }

  const signin = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {

        history.push("/home");

        database
          .ref("active_users/")
          .push()
          .set({
            username: authUser.user.email.slice(0, -10),
            email: emailRef.current.value,
            password: passwordRef.current.value,
            time: sessionStorage.getItem("time"),
          });
      })
      .catch((error) => {
        setError(true)
       setMessage(error.message)
      });
  };

  const clearAccount = () => {
    setUsing(false);
  };

  return (
    <div className="sign__up">
      <h1
        className={
          !using
            ? "headline__row_3 fadeIn2 first2"
            : "headline__row_3 fadeIn first"
        }
      >
        {!using ? "Sign in" : "Sign up"}
      </h1>
      <input
        ref={emailRef}
        type="email"
        name="email"
        id="email-field"
        placeholder="Email"
        className={
          !using
            ? "Mail__sing_in fadeIn2 second2"
            : "Mail__sing_in fadeIn second"
        }
        autoComplete="off"
      />
      <input
        ref={passwordRef}
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        className={
          !using
            ? "Mail__sing_in fadeIn2 third2"
            : "Mail__sing_in  fadeIn third"
        }
        autoComplete="off"
      />
      <button
        className={
          !using ? "submit-btn fadeIn2 fourth2" : "submit-btn fadeIn fourth"
        }
        type="submit"
        onClick={!using ? signin : register}
      >
        {!using ? "Sign in" : "Sign up"}
      </button>
      {!using ? (
        <h4 className={!using ? "new fadeIn2 fifth2" : "new fadeIn fifth"}>
          New to Netflix?
          <span
            className="signup"
            onClick={createAccount}
            style={{ marginLeft: "4px" }}
          >
            Sign up now
          </span>
        </h4>
      ) : (
        <h4 className={!using ? "new fadeIn2 fifth2" : "new fadeIn fifth"}>
          Already have account?
          <span
            className="signup"
            onClick={clearAccount}
            style={{ marginLeft: "4px" }}
          >
            Sign in
          </span>
        </h4>
      )}
           {!using ? (
        <h4 className={!using ? "new fadeIn2 fifth2" : "new fadeIn fifth"} style={{marginTop:'-5px'}}>
          Forgot password?
          <span
            className="signup"
            onClick={resetPassword}
            style={{ marginLeft: "4px", textDecoration:"underline" }}
          >
            Reset it now
          </span>
        </h4>
      ) : ""}
        {error ? (
        
          <span
            className="signup"
            style={{ marginLeft: "4px", color:'red' }}
          >
            {message}
          </span>
      ) : ""}
    </div>
  );
}

export default SignIn;
