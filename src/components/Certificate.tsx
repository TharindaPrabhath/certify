import React from "react";

import "./Certificate.css";

import logo from "../assets/logo/logo.png";

const Certificate = () => {
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
            <h1 className="reciever">Tharinda P Anurajeewa</h1>
            <p className="description">
              is hereby awarded this certificate of achievement for the
              contribution of <span>Supplying educational materials</span> on
              2021 Aug 23
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
            Certificate ID:<span> 123-567-890</span>
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
