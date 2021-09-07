import React from "react";
import DashCard from "../components/DashCard";

import "../screens/Dashboard.css";

import CertificateImg from "../assets/certificate.png";
import WelcomeImg from "../assets/welcome.svg";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { ReducerType } from "../redux/store";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { initAdmin, removeAdmin } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const currentAdmin = useSelector(
    (state: ReducerType) => state.adminReducer.currentAdmin
  );

  return (
    <div className="dashboard">
      <div className="dashboard__content">
        <div className="welcome-banner">
          <div className="welcome-banner__content">
            <div className="left-col">
              <h1 className="greet">
                {"Hello " + localStorage.getItem("currentAdmin")}
              </h1>
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
