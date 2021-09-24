import colors from "../data/colors";

const useBadge = () => {
  return {
    VerifiedBadge,
    CertifiedBadge,
    StatusBadge,
    CertificateCategoryBadge,
  };
};

export default useBadge;

const VerifiedBadge = ({ verified }: { verified: boolean }) => {
  return (
    <div
      style={{
        backgroundColor: verified
          ? colors.primarySuccesClr
          : colors.primaryErrorClr,
        padding: "0.2em 1em",
        borderRadius: "0.5em",
        boxShadow: "1px 2px 5px #1b1a1a",
      }}
    >
      <p style={{ fontWeight: 600 }}>{verified ? "Verified" : "Unknown"}</p>
    </div>
  );
};

const CertifiedBadge = ({ certified }: { certified: boolean }) => {
  if (certified) {
    return (
      <div
        style={{
          backgroundColor: colors.primaryBrandClr,
          padding: "0.2em 1em",
          borderRadius: "0.5em",
          boxShadow: "1px 2px 5px #1b1a1a",
        }}
      >
        <p style={{ fontWeight: 600 }}>Certified</p>
      </div>
    );
  } else return null;
};

const StatusBadge = ({ member }: { member: boolean }) => {
  return (
    <div
      style={{
        backgroundColor: "transparent",
      }}
    >
      <p
        style={{
          fontWeight: 600,
          color: `${member ? colors.primaryBrandClr : colors.primaryErrorClr}`,
          fontSize: "1em",
        }}
      >
        {member ? "Member" : "Third Party"}
      </p>
    </div>
  );
};

// (member certificate or not)
const CertificateCategoryBadge = ({
  memberCertificate,
}: {
  memberCertificate: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: "transparent",
      }}
    >
      <p
        style={{
          fontWeight: 600,
          color: `${
            memberCertificate ? colors.primaryBrandClr : colors.primaryErrorClr
          }`,
          fontSize: "1em",
        }}
      >
        {memberCertificate ? "Member Certificate" : "Third Party"}
      </p>
    </div>
  );
};
