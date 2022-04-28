import React, { useState, useLayoutEffect } from "react";
import "./Banner.css";
import { CheckLg, InfoCircle, PlusLg } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { auth, database } from "./Firebase";

function Buttons({ classBtn, movie }) {
  const [added, setAdded] = useState(false);

  useLayoutEffect(() => {
    var user = auth.currentUser;
    var ids = [];

    if (movie?.id !== undefined) {
      if (user) {
        database.ref("list/" + user.uid + "/").on("child_added", (snapshot) => {
          if (parseInt(snapshot.val().id) === movie?.id) {
            setAdded(true);
            ids.push(snapshot.val().id);
          } else {
            setAdded(false);
          }
        });

        for (const id of ids) {
          
          if (id === movie.id) {
            setAdded(true);
          } else {
            setAdded(false);
          }
        }
      }
    }
  }, [movie]);

  function addToListMovie() {
    var user = auth.currentUser;

    if (added === true) {
      if (user) {
        database
          .ref("list/" + user.uid + "/")
          .child(movie.id)
          .remove();
        setAdded(false);

      }
    } else {
      if (user) {
        database.ref("list/" + user.uid + "/" + movie.id).set(movie);
        setAdded(true);
 
      }
    }
  }
  return (
    <div className="flag-div">
        {
          window.innerWidth < 900 ? (
      <div className={classBtn}>
            <button className="banner_button flex-btn" onClick={addToListMovie}>
          {added === false ? <PlusLg  className="iconic" /> : <CheckLg className="iconic" />}
          My List
        </button>
        <button className="banner_button middle-button">
          <FontAwesomeIcon
            icon={faPlay}
            className="iconic mrg-play"
          ></FontAwesomeIcon>
          Play
        </button>
        <button className="banner_button flex-btn">
          <InfoCircle
            className="iconic"
          />
          Info
        </button>
      </div>
          ): (
            <div className={classBtn}>
  
        <button className="PlayMedia">
          <FontAwesomeIcon
            icon={faPlay}
            className="iconic-media"
          ></FontAwesomeIcon>
          Play
        </button>
        <button className="infoMedia">
          <InfoCircle
            className="iconic-media"
          />
          More
          Info
        </button>
      </div>
          )
        }
    </div>
  );
}

export default Buttons;
