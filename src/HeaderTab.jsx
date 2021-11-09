import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRss,faSortDown} from "@fortawesome/free-solid-svg-icons";
import { Search } from 'react-bootstrap-icons';
import { useHistory, Link } from "react-router-dom";
import {auth} from './Firebase'
import "./App.css";
import "./list.css";


function HeaderTab({headline}) {

   const history = useHistory();

    return (
        <div>
             <header className="float-header" style={{ zIndex: "999999" }}>
        <div className="flex">
          <p className="headline" style={{ fontSize: "21px" }}>
            {headline}
          </p>
        </div>
        <div className="right-hand">
          <FontAwesomeIcon icon={faRss} style={{opacity:'0'}} />
          <Search size={24} color='white'  onClick={() => {
              history.push("/search");
            }}/>
          <div className="user">
            <Link to={`/profile/${auth.currentUser.uid}/settings`}>
              <img
                src={auth.currentUser.photoURL}
                className="whoswathcing"
                width={30}
                height={30}
                alt=""
              />
            </Link>
            <FontAwesomeIcon icon={faSortDown} className="switch" />
          </div>
        </div>
      </header>
        </div>
    )
}

export default HeaderTab
