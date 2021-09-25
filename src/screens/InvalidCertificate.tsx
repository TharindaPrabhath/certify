import "./InvalidCertificate.css";

import CancelIcon from "@material-ui/icons/Cancel";

const InvalidCertificate = ({
  invalidCertificateId,
}: {
  invalidCertificateId?: string;
}) => {
  return (
    <div className="invalid-certificate">
      <div className="invalid-certificate__content">
        <h1>Oooops...</h1>
        <CancelIcon fontSize="large" />
        <h3>Invalid Certificate!</h3>
        <p>{`Entered Certificate ID :  ${
          invalidCertificateId ? invalidCertificateId : ""
        }  is not recognized as a Certify issued valid certificate. Please make sure that you entered certificate id is correct`}</p>
      </div>
    </div>
  );
};

export default InvalidCertificate;
