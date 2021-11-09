import React, { useState, useLayoutEffect } from "react";
import Axios from "./axios";
import "./Banner.css";
import Row from "./Row";
import Buttons from "./Buttons";
import Logo from "./netflix-logo.png";
import Geners from "./Gener";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

function Banner({ title, fetchURL, isBannerInMiddle }) {
  const [movies, setMovies] = useState([]);

  useLayoutEffect(() => {
    async function fetchData() {
      const request = await Axios.get(fetchURL);
      setMovies(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }
    fetchData();
  }, [fetchURL]);


  async function fetchData() {
    const request = await Axios.get(fetchURL);
    setMovies(
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ]
    );
    console.log(request.data.results.length);
    console.log(request.data.results);

    return request;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies?.poster_path}")`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* {!isBannerInMiddle ? <Navigation></Navigation> : ""} */}
      <div className={isBannerInMiddle ? "fade-top" : ""}></div>
      <div id="banner-content-id">
        <div className="banner_content" id="content">
          <div
            className={
              window.innerWidth < 900 && !isBannerInMiddle
                ? "banner-div mr-div"
                : "banner-div"
            }
          >
            {!isBannerInMiddle ? (
              <div className="n-series">
                <img src={Logo} alt="" className="n-logo" />
                <p className="n-text">SERIES</p>
              </div>
            ) : (
              ""
            )}
            <h1
              className={
                !isBannerInMiddle && window.innerWidth < 900
                  ? "middle-title x-title"
                  : "banner_title mid-y"
              }
            >
              {movies?.title || movies?.name || movies?.original_name}
            </h1>
          </div>

          {window.innerWidth  > 900  ? ( 
          <Buttons
         movie={movies}
        classBtn={isBannerInMiddle? "align_left banner_buttons": "align_middle banner_buttons"}></Buttons>) :
         ""}
          <h1
            className={
              !isBannerInMiddle && window.innerWidth < 900
                ? "fade-none"
                : "banner_description"
            }
          >
            {movies?.overview || ""}
          </h1>
        </div>
      </div>
      <div className="swiper-original">
        {isBannerInMiddle ? (
          <Row title={title} fetchURL={fetchURL} key={1} isLaregeRow></Row>
        ) : (
          ""
        )}
        {!isBannerInMiddle && window.innerWidth > 900 ? (
          <Row title={title} fetchURL={fetchURL} key={1} isLaregeRow></Row>
        ) : (
          ""
        )}
      </div>

      <div
        className={
          !isBannerInMiddle && window.innerWidth < 900
            ? "fade--bottom new-fade"
            : "fade--bottom"
        }
      ></div>
      {!isBannerInMiddle && window.innerWidth < 900 ? (
        <div>
          <Geners></Geners>
          <Buttons classBtn="align_middle_btns banner_buttons b-mds" movie={movies}></Buttons>
        </div>
      ) : (
        ""
      )}
     
      <div className="movie-changer">
        <FontAwesomeIcon
          icon={faRedo}
          
          className="refresh-icon"
          onClick={fetchData}
        ></FontAwesomeIcon>
        <button onClick={fetchData} className="change-movie">
          Change movie
        </button>
      </div> {
        window.innerWidth < 900 && !isBannerInMiddle ?
       (
       ""
       )
        : ""
      }
    </header>
  );
}
export default Banner;
