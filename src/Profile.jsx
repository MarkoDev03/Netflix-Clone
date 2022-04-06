import React, { useState, useLayoutEffect, useEffect } from "react";
import { auth, database } from "./Firebase";
import Navbar from "./Navbar";
import { useHistory } from "react-router-dom";
import "./profile.css";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [planSubscribe, setPlan] = useState("");
  const [planName, setPlanName] = useState("");
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2002);
  
  const history = useHistory();

  const plan = [
    {
      name: "Netflix Premium",
      quality: "4k + HDR",
      id: "3",
    },
    {
      name: "Netflix Standard",
      quality: "1080p",
      id: "1",
    },
    {
      name: "Netflix Basic",
      quality: "480p",
      id: "2",
    },
  ];

  useLayoutEffect(() => {
    const userIsLoggedIn = auth.onAuthStateChanged((user) => {
      if (user) {
        var chars = { ".": "", "#": "", "[": "", $: "" };
        var username = user.email
          .replace(/[.#$]/g, (m) => chars[m]);

        database
          .ref("plans")
          .child(username)
          .on("value", (snap) => {
            setDay(snap.val().day)
            setMonth(snap.val().month + 1)
            setPlan(snap.val().plan);
            setYear(snap.val().year)
            if (snap.val().plan === "3") {
              setPlanName("premium")
            } else  if (snap.val().plan === "1") {
              setPlanName("standard")
            } else {
              setPlanName("basic")
            }
          });
          
          if(auth.currentUser.photoURL === null) {
            auth.currentUser.updateProfile({
              photoURL : 'https://occ-0-1490-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAAFC6l7pcqKJdIX7RCNbBpOxvRnBhCkn1NxSxWM0xScvSvgynXUN-epFc_09AgSWmIC12b8jaVdiCSDV54-J4dHco9MA.png?r=f80'
              })
          }

        setUsername(user.uid);
        setEmail(user.email);
      } else {
        setUsername("");
        setEmail("");

        history.push("/login");
      }
    });

    return userIsLoggedIn;
  }, [history]);

  const signOut = () => {
    auth.signOut();
    setUsername("");
    localStorage.setItem("search-history",null)
    history.push("/home");
  };

  const addPlan = (itemId) => {
    setPlan(itemId);

    var chars = { ".": "", "#": "", "[": "", $: "" };

    auth.onAuthStateChanged((user) => {
      var username = user.email.replace(/[.#$]/g, (m) => chars[m]);

      if (user) {
          
            var timeAdded = new Date();
            sessionStorage.setItem("time_added_plan", timeAdded);

            database.ref(`plans/${username}`).set({
              email: user.email,
              time: sessionStorage.getItem("time_added_plan"),
              plan: itemId,
              day:timeAdded.getDate(),
              month:timeAdded.getMonth(),
              year:timeAdded.getFullYear()
            });
         
      }
    });
  };

  useEffect(() => {
   setTimeout(() => {
      try {
        var hd = document.getElementById("info-user").clientWidth;
  
      if (window.innerWidth > 900) {
        document.getElementById("pl-all").style.width = hd + "px";
        document.getElementById("signout").style.width = hd + "px";
        document.getElementById("history").style.width = hd + "px";
      }
      } catch(error) {
        console.log(error);
      }
   }, 100);
    
  }, []);

  var plans = "Plans (Current Plan: "  + planName + ")";

  return (
    <div className="user-profile">
      <Navbar username={username} isProfile={true}></Navbar>
      <div className="wrp-profile-main">
      <div className="profile">
        <h1 className="edit-headline">Edit Profile</h1>
        <div className="profile__wrapper">
          <img src={auth.currentUser.photoURL} alt="" className="logo" onClick={() => history.push("/profile/"+username+"/change-avatar")}
           loading="lazy"
           crossOrigin="anonymous"
          />
          <div className="info-user" id="info-user">
            <input
              type="text"
              name="email"
              id="email-user"
              className="username"
              readOnly={true}
              defaultValue={email}
            />
            <p className="plans premium">{plans}</p>
          </div>
        </div>
        <div className="plans-overview" id="pl-all">
          <div className="plans">
            <div className="plan Renwal">
              <span>Renewal date: {day}/{month}/{year} </span>
            </div>
          </div>
          {plan.map((item) => (
            <div className="plan-offer" key={item.name}>
              <div className="plan-data">
                <p className="plan-name">{item.name}</p>
                <p className="plan-quality">{item.quality}</p>
              </div>
              <button
                className={
                  item.id === planSubscribe ? "grey-button" : "subscribe"
                }
                onClick={() => addPlan(item.id)}
                id={item.id}
              >
                {item.id === planSubscribe ? "Current Plan" : "Subscribe"}
              </button>
            </div>
          ))}
        </div>
        <button className="logout-btn" onClick={signOut} id="signout">
          SIGN OUT
        </button>
      </div>
    </div>
    </div>
  );
}

export default Profile;
