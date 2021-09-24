import React from "react";

import "../components/DashCard.css";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useHistory } from "react-router";

const DashCard = ({
  title,
  value,
  redirectPath,
  image,
}: {
  title: string;
  value: number;
  redirectPath: string;
  image: any;
}) => {
  const history = useHistory();

  return (
    <div className="dash-card">
      <div className="dash-card__content">
        <div className="left-col">
          <p className="title">{title}</p>
          <h2 className="value">{value}</h2>
          <p
            className="redirect-link"
            onClick={() => history.push(redirectPath)}
          >
            View
            <NavigateNextIcon />
          </p>
        </div>

        <div className="right-col">
          <img src={image} alt="Icon" className="image" />
        </div>
      </div>
    </div>
  );
};

export default DashCard;
