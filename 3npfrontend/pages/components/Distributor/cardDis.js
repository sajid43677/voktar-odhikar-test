import React from "react";

export default function MyCardDis(props) {
  return (
    <div className="card-container">
      {props.items.map((content, index) => (
        <div
          key={index}
          className="card"
          style={{ fontSize: `${props.textSize}px` }}
        >
          {content}
        </div>
      ))}
    </div>
  );
}
