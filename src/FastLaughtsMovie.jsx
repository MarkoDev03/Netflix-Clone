import React, { useState, useContext } from "react";
import { PlusLg, Check2, EmojiSmile, CaretRightFill, Cursor } from 'react-bootstrap-icons';
import { auth, database } from "./Firebase";
import { FastLaughtsMovieContext } from "./FastLaughts";

function FastlaughtsMovie() {

    const [list, setList] = useState(false);
    const { movie } = useContext(FastLaughtsMovieContext)
    
    const base_image_url = "https://image.tmdb.org/t/p/original/";

      const StyleSheet3 = {
         display:'flex',
         justifyContent:'flex-end',
         alignItems:'center',
         flexDirection:'column',
         position:'absolute',
         bottom:'70px',
         right:'5px',
         width:'60px',
      }

      const StyleSheet4 ={
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
        color:'white',
        fontSize:'16px',
        fontWeight:'400',
        marginTop:'30px'
      }

      const addToList = (movie) => {
        var user = auth.currentUser;
    
        if (user) {
          database.ref("list/" + user.uid + "/" + movie.id).set(movie);
          setList(true);
        }
      };
    
      const removeFromList = (movie) => {
        var user = auth.currentUser;
    
        if (user) {
          database
            .ref("list/" + user.uid + "/")
            .child(movie.id)
            .remove();
          setList(false);
        }
      };

      const items = [
          {icon:<EmojiSmile size={25} color='white' />, text:'LOL'},
          {icon:list ? <Check2 size={25} color='white' /> : <PlusLg size={25} color='white' />, text:'My List', function:list ? removeFromList : addToList},
          {icon:<Cursor size={25} color='white' />, text:'Share'},
          {icon:<CaretRightFill size={25} color='white' />, text:'Play'},
      ]

    return (
       <React.Fragment>
                       <div style={{
                            width: '100%',
                            height: '100vh',
                            objectFit: 'contain',
                            backgroundImage:`url('${base_image_url}${movie.poster_path}')`,
                            backgroundSize:'cover',
                            backgroundPosition:'center'
                       }}>
                           <div style={StyleSheet3}>
                                {
                                    items.map((item) => (
                                        <div 
                                           style={StyleSheet4} 
                                           onClick={() => item.function(movie)}>
                                            {item.icon}
                                            <span style={{marginTop:'6px'}}>
                                                {item.text}
                                            </span>
                                        </div>
                                    ))
                                }
                           </div>
                       </div>
       </React.Fragment>
    );
}

export default FastlaughtsMovie;
