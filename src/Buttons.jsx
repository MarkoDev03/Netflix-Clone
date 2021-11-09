import React, { useState, useLayoutEffect } from "react";
import "./Banner.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faPlay,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { auth, database } from "./Firebase";

function Buttons({ classBtn, movie }) {
  const [added, setAdded] = useState(false);

  useLayoutEffect(() => {
    var user = auth.currentUser;
    var ids = [];

    if (movie.id !== undefined) {
      if (user) {
        database.ref("list/" + user.uid + "/").on("child_added", (snapshot) => {
          if (parseInt(snapshot.val().id) === movie.id) {
            setAdded(true);
            ids.push(snapshot.val().id);
          } else {
            setAdded(false);
          }
        });

        for (const id of ids) {
          console.log(id);
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
      <div className={classBtn}>
        <button className="banner_button flex-btn" onClick={addToListMovie}>
          <FontAwesomeIcon
            icon={added === false ? faPlus : faCheck}
            className="iconic"
          ></FontAwesomeIcon>
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
          <FontAwesomeIcon
            icon={faInfoCircle}
            className="iconic"
          ></FontAwesomeIcon>
          Info
        </button>
      </div>
    </div>
  );
}

export default Buttons;
