import React from "react";
import "./Banner.css";

const geners = [
  { name: "Ominous", class: "headline-gener",id:1 },
  { name: "·", class: "Red" ,id:2},
  { name: "Scary", class: "headline-gener",id:3 },
  { name: "·", class: "Red" ,id:4},
  { name: "Exciting", class: "headline-gener" ,id:5},
  { name: "·", class: "Red",id:6 },
  { name: "Sci-Fi TV", class: "headline-gener",id:7 },
  { name: "·", class: "Red" ,id:8},
  { name: "Horror", class: "headline-gener",id:9 },
  { name: "·", class: "Red" ,id:10},
  { name: "Teen", class: "headline-gener",id:11 },
];

const Gener = () => {
  return (
    <div>
      <div className="genders">
        {geners.map((gener) => (
          <span key={gener.id} className={gener.class}>{gener.name}</span>
        ))}
      </div>
    </div>
  );
};

export default Gener;
