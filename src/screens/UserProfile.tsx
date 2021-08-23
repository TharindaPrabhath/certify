import React from "react";

import "./UserProfile.css";

import UserProfileImg from "../assets/userProfile.jpg";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import DateRangeIcon from "@material-ui/icons/DateRange";

const UserProfile = () => {
  return (
    <div className="user-profile">
      <div className="left-col">
        <div className="user-profile__header">
          <div
            className="cover-img"
            style={{
              backgroundImage: `url("https://images.pexels.com/photos/2684383/pexels-photo-2684383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              height: "10em",
              //   filter: "blur(0.2em)",
            }}
          >
            <img src={UserProfileImg} alt="Profile Img" />
          </div>

          <div className="brief-info">
            <h2 className="name">Wonder Woman</h2>
            <div className="other">
              <p className="role">
                <PersonOutlineIcon />
                Student
              </p>
              <p className="added">
                <DateRangeIcon />
                added 2021 Aug 23
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="right-col"></div>
    </div>
  );
};

export default UserProfile;
