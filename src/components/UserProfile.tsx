import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  AppBar,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import UserDto from "../types/models/UserDto";
import { fetchCertificatesByUser, fetchUser } from "../utils/requestHelper";
import useBadge from "../utils/useBadge";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import "./UserProfile.css";
import CertificateDto from "../types/models/CertificateDto";
import { toCertificateDtos } from "../utils/mapper";

interface UserProfileProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ open, onClose, id }) => {
  const [user, setUser] = useState<UserDto>();
  const [certificates, setCertificates] = useState<CertificateDto[]>();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { VerifiedBadge, CertifiedBadge } = useBadge();

  useEffect(() => {
    if (open) {
      fetchUser(id)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error(err);
        });

      fetchCertificatesByUser(id)
        .then((res) => {
          setCertificates(toCertificateDtos(res.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id, open]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>User Profile</DialogTitle>
      <DialogContent style={{ padding: "0", margin: "0" }}>
        <div className="user-profile-dialog">
          <AppBar position="sticky" color="secondary">
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="standard"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Info" />
              <Tab label="Certificates" />
            </Tabs>
          </AppBar>

          <div className="user-profile-dialog__body">
            {selectedTab === 0 && (
              <div className="user-profile-dialog__info">
                <section className="info__badges-container">
                  <h5>Badges</h5>
                  <div className="badges">
                    <VerifiedBadge verified={user?.emailVerified!} />
                    <CertifiedBadge certified={user?.certified!} />
                  </div>
                </section>

                <section className="info__info-container">
                  <div className="set-1">
                    <div className="set__left-col">
                      <p className="key">First Name</p>
                      <p className="key">Last Name</p>
                      <p className="key">Role</p>
                      <p className="key">Birthday</p>
                      <p className="key">Email</p>
                      <p className="key">Phone</p>
                    </div>
                    <div className="set__right-col">
                      <p className="value">{user?.fname}</p>
                      <p className="value">{user?.lname}</p>
                      <p className="value">{user?.role}</p>
                      <p className="value">{user?.birthday}</p>
                      <p className="value">{user?.email}</p>
                      <p className="value">{user?.phone}</p>
                    </div>
                  </div>

                  <div className="set-2">
                    {user?.address && (
                      <div className="descriptive-section">
                        <p className="key">Address</p>
                        <p className="descriptive-section__value">
                          {user?.address}
                        </p>
                      </div>
                    )}

                    {user?.description && (
                      <div className="descriptive-section">
                        <p className="key">Description</p>
                        <p className="descriptive-section__value">
                          {user?.description}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            )}
            {selectedTab === 1 && (
              <div className="user-profile-dialog__certificates">
                {certificates?.length !== 0 ? (
                  certificates?.map((certificate, index) => {
                    return (
                      <Certificate key={index} certificate={certificate} />
                    );
                  })
                ) : (
                  <div
                    style={{
                      margin: "0 auto",
                    }}
                  >
                    <p>No certificates has achieved yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserProfile;

const Certificate = ({ certificate }: { certificate: CertificateDto }) => {
  const history = useHistory();

  return (
    <div className="certificate-card">
      <div className="certificate-card__content">
        <div className="certificate-card__content__row-1">
          <h3 className="certificate-type">{certificate.type}</h3>
          <p className="issued-date">{certificate.issuedDate}</p>
        </div>
        <div className="certificate-card__content__row-2">
          <p className="certificate-reason">{certificate.reason}</p>
          <div className="row-2__sub-row">
            <p className="certificate-issued-by">{`Issued by: ${certificate.admin.username}`}</p>
            <p
              className="certificate-redirect-link"
              onClick={() =>
                history.push(`/certificate/view?id=${certificate.id}`)
              }
            >
              View
              <NavigateNextIcon />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
