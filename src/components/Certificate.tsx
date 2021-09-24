import React from "react";

import "./Certificate.css";

import logo from "../assets/logo/logo.png";
import CertificateDto from "../types/models/CertificateDto";
import moment from "moment";

const Certificate = ({
  certificate,
}: {
  certificate: CertificateDto | undefined;
}) => {
  return (
    <div className="certificate">
      <div className="certificate__content">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="Logo" width={32} />
            <h2>Certify</h2>
          </div>
        </div>

        <div className="body">
          <div className="reciever-details">
            <h1 className="reciever">{`${certificate?.user.fname} ${certificate?.user.lname}`}</h1>
            <p className="description">
              is hereby awarded this certificate of achievement for the
              contribution of <span>{certificate?.reason}</span> on
              {` ${moment(certificate?.issuedDate, "YYYY-MM-DD").format(
                "YYYY-MM-DD"
              )}`}
            </p>
          </div>

          <div className="issuer-details">
            <div className="left-col">
              <h4 className="sign-person-1">President-Certify Inc.</h4>
            </div>

            <div className="middle-col"></div>

            <div className="right-col">
              <h4 className="sign-person-2">Vice President-Certify Inc.</h4>
            </div>
          </div>
        </div>

        <div className="footer">
          <h5 className="certificate-id">
            Certificate ID:<span>{`  ${certificate?.id}`}</span>
          </h5>
          <h5 className="verification-web-site">
            Verify the authenticity of the certificate at:
            <span> www.certify.com/certificate/verify</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
