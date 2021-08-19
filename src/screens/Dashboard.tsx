import React from "react";
import DashCard from "../components/DashCard";

import "../screens/Dashboard.css";

import CertificateImg from "../assets/certificate.png";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__content">
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
  );
};

export default Dashboard;
