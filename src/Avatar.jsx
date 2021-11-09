import "./avatar.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft,faSortDown,} from "@fortawesome/free-solid-svg-icons";
import { useHistory, Link } from "react-router-dom";
import { Search } from 'react-bootstrap-icons';
import { auth } from "./Firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "./Row.css";
import data from "./avatars.json";

function Avatar() {
  const history = useHistory();
  function setNewAvatar(url) {
    auth.currentUser.updateProfile({
      photoURL: url,
    });
    document.getElementById("avatar").src = url;
  }
  const rows = [
    {
      txt: "The Classics",
      data: data.avatars,
    },
    {
      txt: "LUCIFER",
      data: data.lucifer,
    },
    {
      txt: "MONEY HEIST",
      data: data.moneyHeist,
    },
    {
      txt: "ELITE",
      data: data.elite,
    },
    {
      txt: "OUR PLANET",
      data: data.ourplanet,
    },
    {
      txt: "LUPIN",
      data: data.lupin,
    },
    {
      txt: "THE WITCHER",
      data: data.thewitcher,
    },
    {
      txt: "THE STRANGER THINGS",
      data: data.strangerthings,
    },
    {
      txt: "BOSS BABY",
      data: data.boosbaby,
    },
    {
      txt: "DARK",
      data: data.dark,
    },
    {
      txt: "Orange Is the New Black",
      data: data.orangeisthenewblack,
    },
    {
      txt: "BLACK MIRROR",
      data: data.blackmirror,
    },
    {
      txt: "THE CROWN",
      data: data.thecrown,
    },
    {
      txt: "COBRA KAI",
      data: data.cobrakai,
    },
    {
      txt: "BLACK HORSEMAN",
      data: data.blackhorseman,
    },
    {
      txt: "BRIGHT",
      data: data.bright,
    },
    {
      txt: "BIG MOUTH",
      data: data.bigmouth,
    },
    {
      txt: "DEFENDERS",
      data: data.defenders,
    },
    {
      txt: "Shadow and Bone",
      data: data.shadowandbone,
    },
    {
      txt: "LOST IN SPACE",
      data: data.lostinspace,
    },
    {
      txt: "The Epic Tales of Captain Underpants",
      data: data.epictales,
    },
    {
      txt: "LARVA ISLAND",
      data: data.larvaisland,
    },
    {
      txt: "Ask the StoryBots",
      data: data.storybots,
    },
  ];

  return (
    <div className="showup-avatar">
      <header className="float-header" style={{ zIndex: "999999" }}>
        <div className="flex">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="Aee"
            onClick={() => {
              history.push("/profile/"+auth.currentUser.uid+"/settings");
            }}
          ></FontAwesomeIcon>
          <p className="headline" style={{ fontSize: "23px" }}>
            Chose Avatar
          </p>
        </div>
        <div className="right-hand" style={{ width: "96px" }}>
  
          <Search size={24} color='white'   onClick={() => {
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
                id="avatar"
              />
            </Link>
            <FontAwesomeIcon icon={faSortDown} className="switch" />
          </div>
        </div>
      </header>
      <div style={{ height: "60px" }}></div>
      {rows.map((row) => (
        <div className="avatar-row" key={row.txt}>
          <h2 className="row-title" key={row.txt}>{row.txt}</h2>
          <Swiper
            slidesPerView={6}
            spaceBetween={30}
            freeMode={true}
            breakpoints={{
              1920: { slidesPerView: 9.5, spaceBetween: 10 },
              1400: { slidesPerView: 8.5, spaceBetween: 10 },
              1000: { slidesPerView: 7.5, spaceBetween: 10 },
              700: { slidesPerView: 5.5, spaceBetween: 10 },
              500: { slidesPerView: 3.5, spaceBetween: 10 },
              400: { slidesPerView: 3.5, spaceBetween: 10 },
              300: { slidesPerView: 3.5, spaceBetween: 10 },
            }}
            className="swiper-avatar"
          >
            {row.data.map((item) => (
              <SwiperSlide>
                <img
                  src={item.url}
                  alt=""
                  className="swiper_slide_avatar"
                  key={item.url}
                  style={{marginTop:'7px'}}
                  onClick={() => {
                    setNewAvatar(item.url);
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
}
export default Avatar;
