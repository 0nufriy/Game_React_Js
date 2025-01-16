import React from "react";

const ArtefactItem = ({ color, image, onClick }) => (
  <div
    onClick={onClick}
    style={{
      width: "100%",
      backgroundColor: color,
      borderRadius: "4vw",
      border: "1vw solid #221A1A",
      minWidth: "18vw",
      cursor: "pointer", // Додамо курсор для натяку на взаємодію
    }}
  >
    <img
      src={image}
      alt="База"
      className="img-fluid"
      style={{
        width: "100%",
        height: "auto",
      }}
    />
  </div>
);

export default ArtefactItem;
