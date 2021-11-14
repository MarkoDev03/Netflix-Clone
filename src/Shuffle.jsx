import React from 'react'
import ShuffeImg from './shuffle.png'
import "./shuffle.css"

function Shuffle() {
    return (
        <div className="shuffle-mode">
            <img src={ShuffeImg} alt="shuffle" className="shuffle-img" />
            <h1>Not sure what to watch?</h1>
            <br />
            <span>We'll shuffle everything on Netflix for and find things for you  </span> <br />
            <span className="shuffle-mode-scnd">to watch based on your tastes.</span>
            <button className="play-smth">
            <img src={ShuffeImg} alt="shuffle" className="shuffle-img-btn" />
             <p>Play Something</p>
            </button>
        </div>
    )
}

export default Shuffle
