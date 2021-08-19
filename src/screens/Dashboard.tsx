import React from "react";
import DashCard from "../components/DashCard";

import "../screens/Dashboard.css";

import CertificateImg from "../assets/certificate.png";
import WelcomeImg from "../assets/welcome.svg";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__content">
        <div className="welcome-banner">
          <div className="welcome-banner__content">
            <div className="left-col">
              <h1 className="greet">Hello Tharinda!</h1>
              <p className="des">Welcome to the Certify platform</p>
            </div>

            <div className="right-col">
              <img
                src={WelcomeImg}
                alt="Illustration"
                className="illustration"
              />
            </div>
          </div>
        </div>

        <div className="analytics-cards">
          <DashCard
            title="Total Issued certificates"
            value={20}
            image={CertificateImg}
          />
          <DashCard
            title="Total Issued certificates"
            value={20}
            image={CertificateImg}
          />

          <DashCard
            title="Total Issued certificates"
            value={20}
            image={CertificateImg}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
