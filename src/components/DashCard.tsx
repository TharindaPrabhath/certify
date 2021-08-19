import React from "react";

import "../components/DashCard.css";

const DashCard = ({
  title,
  value,
  image,
}: {
  title: string;
  value: number;
  image: any;
}) => {
  return (
    <div className="dash-card">
      <div className="dash-card__content">
        <div className="left-col">
          <p className="title">{title}</p>
          <h2 className="value">{value}</h2>
        </div>

        <div className="right-col">
          <img src={image} alt="Icon" className="image" />
        </div>
      </div>
    </div>
  );
};

export default DashCard;
