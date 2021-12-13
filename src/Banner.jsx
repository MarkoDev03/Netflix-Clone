import React, { useState, useLayoutEffect } from "react";
import Axios from "./axios";
import "./Banner.css";
import Row from "./Row";
import Buttons from "./Buttons";
import Logo from "./netflix-logo.png";
import Geners from "./Gener";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import './comingsoon.css'

function Banner({ title, fetchURL, isBannerInMiddle }) {
  const [movies, setMovies] = useState([]);
  const [logo, setLogo] = useState("")
  const [genres, setGenres] = useState([]); 

  useLayoutEffect(() => {
    async function getGeners() {
      const data = await Axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=1ac954f3a80a366794602b75222bbf8e&language=en-US");
    
      var resultGenres = []
      
      if (movies.genre_ids.length > 1) {
        data.data.genres.forEach((genre) => {
          movies.genre_ids.forEach((item) => {
            if ( +genre.id === +item) {
              resultGenres.push(genre.name)
            }
          })
        })
       } else {
        data.data.genres.forEach((genre) => {
            if ( +genre.id === +movies.genre_ids) {
              resultGenres.push(genre.name)
            }
        })
       }

       setGenres(resultGenres)
    }
    
    getGeners()
  }, [movies.genre_ids])
 

  const base_image_url = "https://image.tmdb.org/t/p/original/";

  useLayoutEffect(() => {
   fetch(`https://api.themoviedb.org/3/movie/${movies.id}/images?api_key=1ac954f3a80a366794602b75222bbf8e`)
 .then((response) => response.json())
 .then((data) => {
  setLogo(data.logos[0].file_path)
 })
  }, [movies])

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
    fetch(`https://api.themoviedb.org/3/movie/${movies.id}/images?api_key=1ac954f3a80a366794602b75222bbf8e`)
    .then((response) => response.json())
    .then((data) => {
     setLogo(data.logos[0].file_path)
    })


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

            {!isBannerInMiddle && logo === "" && logo === null && logo === undefined ? (
              <div className="n-series">
                <img src={Logo} alt="" className="n-logo" />
                <p className="n-text">SERIES</p>
              </div>
            ) : (
              ""
            )}
           

            {
              logo !== "" && logo !== null && logo !== undefined ? (
                <img src={base_image_url + logo} alt="" className="logomoviesoonbanner" loading="lazy" />
              ): (
                <h1
              className={
                !isBannerInMiddle && window.innerWidth < 900
                  ? "middle-title x-title"
                  : "banner_title mid-y"
              }
            >
              {movies?.title || movies?.name || movies?.original_name}
            </h1>
              )
          }
          </div>
          <span className="genres-mapping mapbanner">
            {
                  genres !== [] ? (
                    
                    genres.map((genreItem) => (
                       <>{genreItem}<div className="red-dot-src-soon"></div></>
                      ))
                    
                  ): ""
                }
            </span>

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
        <div className="fade-geners">
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
