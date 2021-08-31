import { Breadcrumbs, Button, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CertificateTable from "../components/CertificateTable";
import colors from "../data/colors";
import requests from "../data/requests";
import { useButtonStyles } from "../data/styles";
import CertificateDto from "../types/models/CertificateDto";
import axios from "../utils/axios";
import { toCertificateDtos } from "../utils/mapper";

import "./Certificate.css";

const Certificate = () => {
  const [certificates, setCertificates] = useState<CertificateDto[]>([]);
  const buttonStyles = useButtonStyles();

  useEffect(() => {
    axios.get(requests.fetchCertificates).then((res) => {
      setCertificates(toCertificateDtos(res.data));
    });
  }, []);

  return (
    <div className="certificate-screen">
      <div className="certificate-screen__content">
        <div className="top">
          <div className="left-col">
            <h2>Certificates</h2>
            <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
              <Link to="/dashboard">Dashboard</Link>
              <Typography style={{ color: colors.dimmedClr }}>
                Certificates
              </Typography>
            </Breadcrumbs>
          </div>

          <div className="right-col">
            <Link to="certificate/new">
              <Button className={buttonStyles.standardBtn}>
                <AddIcon />
                New Certificate
              </Button>
            </Link>
          </div>
        </div>

        <div className="table">
          <CertificateTable certificates={certificates} />
        </div>
      </div>
    </div>
  );
};

export default Certificate;
