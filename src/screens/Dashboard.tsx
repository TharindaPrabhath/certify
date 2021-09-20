import React, { useEffect, useState } from "react";
import DashCard from "../components/DashCard";

import "../screens/Dashboard.css";

import CertificateImg from "../assets/certificate.svg";
import WelcomeImg from "../assets/welcome.svg";
import UsersImg from "../assets/users.svg";
import AdminsImg from "../assets/admins.svg";

import PercentageWidget from "../components/dashWidgets/PercentageWidget";
import colors from "../data/colors";
import MemberRegistrationAnalysisWidget from "../components/dashWidgets/MemberRegistrationAnalysisWidget";
import {
  fetchAdminsAnalytics,
  fetchCertificatesAnalytics,
  fetchUsersAnalytics,
} from "../utils/requestHelper";
import CertifiedMember from "../../src/assets/certifiedMember.svg";
import VerifiedMember from "../../src/assets/verifiedMember.svg";
import ProgressbarWidget from "../components/dashWidgets/ProgressbarWidget";
import BarChartWidget from "../components/dashWidgets/BarChartWidget";

import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { setLoading } = bindActionCreators(actionCreators, dispatch);
  const [adminAnalytics, setAdminAnalytics] = useState<{
    totalAdmins: number;
  }>();
  const [userAnalytics, setUserAnalytics] = useState<{
    certifiedUsers: {
      uid: number;
      fName: string;
      lName: string;
      numCertificates: number;
    }[];
    userRoles: {
      role: string;
      numOfUsers: number;
    }[];
    registrations: {
      year: number;
      monthRegistrations: {
        month: string;
        numOfRegistrations: number;
      }[];
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

  useEffect(() => {
    setLoading(true);
    fetchAdminsAnalytics()
      .then((res) => {
        setAdminAnalytics(res.data);
      })
      .catch((err) => console.error(err));

    fetchUsersAnalytics()
      .then((res) => {
        setUserAnalytics(res.data);
      })
      .catch((err) => console.error(err));

    fetchCertificatesAnalytics()
      .then((res) => {
        setCertificateAnalytics(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));

    return () => {
      setAdminAnalytics(null!);
      setUserAnalytics(null!);
      setCertificateAnalytics(null!);
      setLoading(false);
    };
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
              title="Total admins"
              value={adminAnalytics?.totalAdmins!}
              redirectPath="/dashboard"
              image={AdminsImg}
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

          <MemberRegistrationAnalysisWidget
            data={userAnalytics?.registrations!}
          />

          <div className="row-4">
            <div className="row-4__bar-chart-widget-container">
              <BarChartWidget data={userAnalytics?.userRoles!} />
            </div>

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
