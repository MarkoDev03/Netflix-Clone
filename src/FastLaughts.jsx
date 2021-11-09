import React, { useState, useLayoutEffect, createContext } from "react";
import Footer from './Footer'
import Axios from "./axios";
import Requests from "./requests";
import { Swiper, SwiperSlide } from "swiper/react";
import FastlaughtsMovie from "./FastLaughtsMovie";
import "swiper/swiper.min.css";

export const FastLaughtsMovieContext = createContext(null);

function Fastlaughts() {

    var [movies, setAllMovies] = useState([]);

   

    useLayoutEffect(() => {

        async function FetchDataFromAPI() {
          const data1 = await Axios.get(Requests.fetchDocumentaries);
          const data2 = await Axios.get(Requests.fetchCrime);
          const data3 = await Axios.get(Requests.fetchDrama);
          const data4 = await Axios.get(Requests.fetchHorrorMovies);
          const data5 = await Axios.get(Requests.fetchMyster);
          const data6 = await Axios.get(Requests.fetchNetflixOriginals);
          const data7 = await Axios.get(Requests.fetchRomanceMovies);
          const data8 = await Axios.get(Requests.fetchThriller);
          const data9 = await Axios.get(Requests.fetchTrending);
          const data10 = await Axios.get(Requests.fetchWar);
          const data11 = await Axios.get(Requests.fetchWestern);
          const data12 = await Axios.get(Requests.fetchHistory);
          const data13 = await Axios.get(Requests.fetchMusic);
          const data14 = await Axios.get(Requests.fetchSciFi);
          const data15 = await Axios.get(Requests.fetchActionMovies);
          const data16 = await Axios.get(Requests.fetchAdventure);
          const data17 = await Axios.get(Requests.fetchAnimated);
          const data18 = await Axios.get(Requests.fetchComedyMovies);
          const data19 = await Axios.get(Requests.fetchFantasy);
          var moviesIn = [];
    
          moviesIn = [
            ...data2.data.results,
            ...data1.data.results,
            ...data3.data.results,
            ...data4.data.results,
            ...data5.data.results,
            ...data6.data.results,
            ...data7.data.results,
            ...data8.data.results,
            ...data9.data.results,
            ...data10.data.results,
            ...data11.data.results,
            ...data12.data.results,
            ...data13.data.results,
            ...data14.data.results,
            ...data15.data.results,
            ...data16.data.results,
            ...data17.data.results,
            ...data18.data.results,
            ...data19.data.results,
          ];
    
          moviesIn = moviesIn.filter(
            (thing, index, self) =>
              index ===
              self.findIndex(
                (t) => t.poster_path === thing.poster_path && t.id === thing.id
              )
          );

          setAllMovies(moviesIn);
        }
    
        FetchDataFromAPI();

      }, []);

      const StyleSheet1 = {
          width:'100%',
          height:'100vh',
          position:'fixed',
          top:'0px'
      }

      const StyleSheet2 ={
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:'fit-content',
        position:'relative'
      }

    return (
       <React.Fragment>
            <Swiper
                style={StyleSheet1}
                 slidesPerView={1}
                 spaceBetween={5}
                 direction={'vertical'}
                
            >
            {
                movies.map((movie) => (
                    <SwiperSlide
                      style={StyleSheet2}
                     > 
                      <FastLaughtsMovieContext.Provider value={{movie}}>
                         <FastlaughtsMovie key={movie.id} />
                      </FastLaughtsMovieContext.Provider>
                    </SwiperSlide>
                ))
            }
      </Swiper>
           <Footer />
       </React.Fragment>
    );
}

export default Fastlaughts;
