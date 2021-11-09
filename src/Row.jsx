import React, { useState, useLayoutEffect, createContext } from "react";
import Axios from "./axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "./Row.css";
import "./index.css";
import Trailer from "./Trailer";

const base_image_url = "https://image.tmdb.org/t/p/original/";

export const MovieContext = createContext(null);

function Row({ title, fetchURL, isLaregeRow, isTopTen, isOnlyOnNetflix }) {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState("");

  useLayoutEffect(() => {
    async function fetchData() {
      const request = await Axios.get(fetchURL);
      localStorage.setItem(title, JSON.stringify(request.data.results))
      setMovies(JSON.parse(localStorage.getItem(title)) ? JSON.parse(localStorage.getItem(title)) : request.data.results);
      return request;
    }

    fetchData();
  }, [title, fetchURL]);

  return (
    <div className="row">
      <h2 className="row-title" key={title}>{title}</h2>

      <Swiper
        className={isLaregeRow ? "large_rows" : "row__posters"}
        slidesPerView={15}
        spaceBetween={30}
        freeMode={true}
        breakpoints={responsiveRowCounter()}
      >
        {isTopTen
          ? movies.slice(0, 10).map((movie, index) => (
              <SwiperSlide
                className={isLaregeRow ? "swiper_slide_large" : "swiper_slide"}
              >
                <div className="rated">
                  <img
                    id={movie.id+"id"}
                    key={movie.id}
                    src={`${base_image_url}${setMovieImage(
                      isLaregeRow,
                      movie
                    )}`}
                    alt={movie.name}
                    className="row__poster"
                    onClick={() => movieClick(movie)}
                  />
                  <h1
                    className={index + 1 === 10 ? "row-index-10" : "row-index"}
                  >
                    {index === 0 ? 1 : index + 1}
                  </h1>
                </div>
              </SwiperSlide>
            ))
          : movies.map((movie) => (
              <SwiperSlide
                className={isLaregeRow ? "swiper_slide_large" : "swiper_slide"}
              >
                <div className="rated">
                  <img
                    key={movie.id}
                    src={`${base_image_url}${setMovieImage(
                      isLaregeRow,
                      movie,
                      isOnlyOnNetflix
                    )}`}
                    id={movie.id+"id"}
                    alt={movie.name}
                    className="row__poster"
                    onClick={() => movieClick(movie)}
                  />
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
      {movie && <Trailer movies={movie}></Trailer>}
    </div>
  );

  function movieClick(moviess) {

      setMovie(moviess);
    
  }

  function responsiveRowCounter() {
    if (isLaregeRow && !isOnlyOnNetflix) {
      return {
        1920: { slidesPerView: 9.5, spaceBetween: 10 },
        1400: { slidesPerView: 8.5, spaceBetween: 10 },
        1000: { slidesPerView: 7.5, spaceBetween: 10 },
        700: { slidesPerView: 5.5, spaceBetween: 10 },
        500: { slidesPerView: 3.5, spaceBetween: 10 },
        400: { slidesPerView: 3.5, spaceBetween: 10 },
        300: { slidesPerView: 3.5, spaceBetween: 10 },
      };
    } else if (!isLaregeRow && !isOnlyOnNetflix) {
      return {
        1920: { slidesPerView: 6.2, spaceBetween: 10 },
        1400: { slidesPerView: 6.2, spaceBetween: 10 },
        1000: { slidesPerView: 6.2, spaceBetween: 10 },
        700: { slidesPerView: 5.2, spaceBetween: 10 },
        500: { slidesPerView: 3.4, spaceBetween: 10 },
        400: { slidesPerView: 3.4, spaceBetween: 10 },
        300: { slidesPerView: 3.4, spaceBetween: 10 },
      };
    } else if (isOnlyOnNetflix) {
      return {
        1920: { slidesPerView: 5.2, spaceBetween: 10 },
        1400: { slidesPerView: 5.2, spaceBetween: 10 },
        1000: { slidesPerView: 4.2, spaceBetween: 10 },
        700: { slidesPerView: 4.2, spaceBetween: 10 },
        500: { slidesPerView: 3.2, spaceBetween: 10 },
        400: { slidesPerView: 2, spaceBetween: 10 },
        300: { slidesPerView: 2, spaceBetween: 10 },
      };
    }
  }

  function setMovieImage(isLaregeRow, movie, isOnlyOnNetflix) {
    if (window.innerWidth > 900) {
      if (isLaregeRow || isOnlyOnNetflix) {
        return movie.poster_path;
      } else {
        return movie.backdrop_path;
      }
    } else if (window.innerWidth < 900) {
      if (isLaregeRow || isOnlyOnNetflix) {
        return movie.poster_path;
      } else {
        return movie.poster_path;
      }
    }
  }
}
export default Row;
