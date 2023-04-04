import { useState } from "react";

interface ListGroupProps {
  items: string[];
  heading: string;
  onClickItem: (item: string) => void;
}

function ListGroup({ items, heading, onClickItem }: ListGroupProps) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  return (
    <>
      <h1>List</h1>
      {items.length === 0 && <p>No Items Found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            className={
              selectedItemIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedItemIndex(index);
              onClickItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
