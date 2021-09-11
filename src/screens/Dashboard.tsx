import React, { useEffect, useState } from "react";
import DashCard from "../components/DashCard";

import "../screens/Dashboard.css";

import CertificateImg from "../assets/certificate.svg";
import WelcomeImg from "../assets/welcome.svg";
import UsersImg from "../assets/users.svg";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { ReducerType } from "../redux/store";
import PercentageWidget from "../components/dashWidgets/PercentageWidget";
import colors from "../data/colors";
import MemberRegistrationAnalysisWidget from "../components/dashWidgets/MemberRegistrationAnalysisWidget";
import {
  fetchCertificatesAnalytics,
  fetchUsersAnalytics,
} from "../utils/requestHelper";
import CertifiedMember from "../../src/assets/certifiedMember.svg";
import VerifiedMember from "../../src/assets/verifiedMember.svg";
import ProgressbarWidget from "../components/dashWidgets/ProgressbarWidget";

const Dashboard = () => {
  const [userAnalytics, setUserAnalytics] = useState<{
    certifiedUsers: {
      uid: number;
      fName: string;
      lName: string;
      numCertificates: number;
    }[];
    totalCertifiedUsers: number;
    totalVerifiedUsers: number;
    totalUsers: number;
    verifiedUsers: { uid: number; fName: string; lName: string }[];
  }>();

  const [certificateAnalytics, setCertificateAnalytics] = useState<{
    certificateTypes: {
      type: string;
      numOfCertificates: number;
      certificates: { id: number }[];
    }[];
    totalCertificates: number;
    totalUserConfirmedCertificates: number;
  }>();
  const dispatch = useDispatch();
  const { initAdmin, removeAdmin } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const currentAdmin = useSelector(
    (state: ReducerType) => state.adminReducer.currentAdmin
  );

  useEffect(() => {
    fetchUsersAnalytics()
      .then((res) => {
        setUserAnalytics(res.data);
      })
      .catch((err) => console.error(err));

    fetchCertificatesAnalytics()
      .then((res) => {
        setCertificateAnalytics(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

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

        <div className="analytic-cards">
          <div className="row-1">
            <DashCard
              title="Total Issued certificates"
              value={certificateAnalytics?.totalCertificates!}
              redirectPath="/certificate"
              image={CertificateImg}
            />

            <DashCard
              title="Total members"
              value={userAnalytics?.totalUsers!}
              image={UsersImg}
              redirectPath="/user"
            />

            <DashCard
              title="Total Issued certificates"
              value={certificateAnalytics?.totalCertificates!}
              redirectPath="/certificate"
              image={CertificateImg}
            />
          </div>

          <div className="row-2">
            <PercentageWidget
              title="Total Certified Members"
              image={CertifiedMember}
              pallete={{
                headerBgClr: "#053D7A",
                bodyBgClr: "#12283f",
                activeFontClr: colors.primaryFontClr,
                deactiveFontClr: colors.secondaryFontClr,
                pieChart: {
                  activeClr: colors.primaryBrandClr,
                  deactiveClr: "#283D64",
                },
              }}
              data={{
                totalValue: userAnalytics?.totalUsers!,
                targetValue: certificateAnalytics?.totalCertificates!,
                pieChart: [
                  {
                    name: "Certified",
                    value: certificateAnalytics?.totalCertificates!,
                  },
                  {
                    name: "All",
                    value: userAnalytics?.totalUsers!,
                  },
                ],
                list: userAnalytics?.certifiedUsers!,
              }}
            />

            <PercentageWidget
              title="Total Verified Members"
              image={VerifiedMember}
              pallete={{
                headerBgClr: "#7A4F01",
                bodyBgClr: colors.secondaryBgClr,
                activeFontClr: colors.primaryFontClr,
                deactiveFontClr: colors.secondaryFontClr,
                pieChart: {
                  activeClr: "#FFEC3D",
                  deactiveClr: "#7D5B1D",
                },
              }}
              data={{
                totalValue: userAnalytics?.totalUsers!,
                targetValue: userAnalytics?.totalVerifiedUsers!,
                pieChart: [
                  {
                    name: "Verified",
                    value: userAnalytics?.totalVerifiedUsers!,
                  },
                  {
                    name: "All",
                    value: userAnalytics?.totalUsers!,
                  },
                ],
                list: userAnalytics?.verifiedUsers!,
              }}
            />
          </div>

          <MemberRegistrationAnalysisWidget />

          <div className="row-4">
            <div className="row-4__progressbar-widget-container">
              <ProgressbarWidget
                title="Issued Certificate Types"
                categories={["Participation", "Content Creation", "Other"]}
                colors={["#FFC107", "#54D62C", colors.primaryBrandClr]}
                values={[
                  certificateAnalytics?.certificateTypes[0].numOfCertificates!,
                  certificateAnalytics?.certificateTypes[1].numOfCertificates!,
                  certificateAnalytics?.certificateTypes[2].numOfCertificates!,
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
