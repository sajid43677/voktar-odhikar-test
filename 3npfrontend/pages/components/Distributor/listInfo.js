import { useState } from "react";

export default function ListInfo(props) {
  const [selectedIndex, setIndex] = useState(-1);

  const liststyle = {
    textAlign: "center",
  };
  return (
    <>
      <h1>{props.listTitle}</h1>
      {props.items.length === 0 && <p>No Items Found</p>}
      <ul className="list-group" style={liststyle}>
        {props.items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setIndex(index);
            }}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
