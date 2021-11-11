import React, { useEffect, useState } from "react";
import { Breadcrumbs, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import colors from "../data/colors";

import "./Report.css";
import { fetchReports } from "../utils/requestHelper";
import moment from "moment";
import NoContent from "../components/NoContent";

const Report = () => {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    fetchReports()
      .then((res) => setReports(res.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="report-screen">
      <div className="report-screen__content">
        <div className="top">
          <div className="left-col">
            <h2>Report</h2>
            <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
              <Link to="/dashboard">Dashboard</Link>
              <Typography style={{ color: colors.dimmedClr }}>
                Report
              </Typography>
            </Breadcrumbs>
          </div>
        </div>

        <div className="card-section">
          {reports.length !== 0 ? (
            reports.map((report) => {
              return (
                <div className="report-card">
                  <div className="report-card__content">
                    <h4 className="report-title">{report.name}</h4>
                    <p className="report-date">
                      {moment(report.createdAt, "YYYY-MM-DD").format(
                        "YYYY-MM-DD"
                      )}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <NoContent />
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
