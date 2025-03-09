import React, { useState } from "react";

export default function Select({ options }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <span>label</span>
      <div>open</div>

      <ul>
        <li
          onClick={() => {
            setIsOpen(false);
          }}
        >
          ----
        </li>
        {options.map((item) => {
          return (
            <li
              key={item.name}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
