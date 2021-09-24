import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SwipeableDrawer,
  TextField,
  Tooltip,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Certificate from "../components/Certificate";

import "./CertificateView.css";

import GetAppIcon from "@material-ui/icons/GetApp";
import { useButtonStyles } from "../data/styles";
import { fetchCertificate } from "../utils/requestHelper";
import CertificateDto from "../types/models/CertificateDto";
import { getCertificateDto } from "../utils/mapper";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ShareIcon from "@material-ui/icons/Share";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import useBadge from "../utils/useBadge";

const CertificateView = () => {
  const [certificate, setCertificate] = useState<CertificateDto>();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);
  const [pageUrl, setPageUrl] = useState<string>("");
  const buttonStyles = useButtonStyles();
  const { VerifiedBadge, StatusBadge } = useBadge();
  const SHARE_ICON_SIZE = 36;

  useEffect(() => {
    const currentUrl = window.location.href;
    setPageUrl(currentUrl);
    const certificateIdFromUrl = currentUrl.replace(
      "https://symetry-certify-frontend.herokuapp.com/certificate/view?id=",
      ""
    );
    console.log(certificateIdFromUrl);

    fetchCertificate(certificateIdFromUrl).then((res) => {
      setCertificate(getCertificateDto(res.data));
    });
  }, []);

  const handleDownload = () => {
    const input = document.getElementById("certificate");
    html2canvas(input!).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "p",
        compress: false,
        unit: "em",
        format: "a4",
      });
      pdf.addImage(imgData, "JPEG", 0, 0, 49.5, 35);
      pdf.save("certify certificate.pdf");
    });
  };

  return (
    <div className="certificate-view">
      <div className="certificate-view__content">
        <div id="certificate" className="certificate-container">
          <Certificate certificate={certificate} />
        </div>
        <div className="actions-container">
          <Button className={buttonStyles.standardBtn} onClick={handleDownload}>
            <GetAppIcon />
            Download
          </Button>
          <Button
            variant="contained"
            style={{ textTransform: "capitalize" }}
            onClick={() => setShareDialogOpen(!shareDialogOpen)}
          >
            <ShareIcon />
            Share
          </Button>
          <Button
            style={{ textTransform: "capitalize" }}
            variant="contained"
            onClick={() => certificate && setDrawerOpen(!drawerOpen)}
          >
            More Info <NavigateNextIcon />
          </Button>
        </div>
      </div>

      <SwipeableDrawer
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
      >
        <div className="drawer">
          <div className="drawer__top">
            <Button className="close-btn" onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </Button>
          </div>
          <div className="drawer__body">
            <Tooltip
              title="certificate ID: click to copy"
              children={
                <Button
                  className="certificate-id-btn"
                  style={{ textTransform: "lowercase" }}
                  variant="contained"
                >
                  {certificate?.id}
                </Button>
              }
            />

            <div className="about-reciever">
              <h4>About reciever</h4>
              <div className="block-form-container">
                <div className="block-form-container__left-col">
                  <p className="key">First Name</p>
                  <p className="key">Last Name</p>
                  <p className="key">Verification Status</p>
                  <p className="key">Member Status</p>
                </div>
                <div className="block-form-container__right-col">
                  <p className="value">{certificate?.user.fname}</p>
                  <p className="value">{certificate?.user.lname}</p>
                  <VerifiedBadge verified={certificate?.user.emailVerified!} />
                  <StatusBadge member={certificate?.user.member!} />
                </div>
              </div>
            </div>

            <div className="about-certificate">
              <h4>About certificate</h4>
              <div className="block-form-container">
                <div className="block-form-container__left-col">
                  <p className="key">Issued On</p>
                  <p className="key">Type</p>
                </div>
                <div className="block-form-container__right-col">
                  <p className="value">
                    {moment(certificate?.issuedDate, "YYYY-MM-DD").format(
                      "YYYY-MM-DD"
                    )}
                  </p>
                  <p className="value type">{certificate?.type}</p>
                </div>
              </div>

              {certificate?.reason && (
                <div className="section">
                  <p className="section__key">Reason</p>
                  <p className="section__value">{certificate?.reason}</p>
                </div>
              )}

              {certificate?.remarks && (
                <div className="section">
                  <p className="section__key">Remarks</p>
                  <p className="section__value">{certificate?.remarks}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SwipeableDrawer>

      <Dialog onClose={() => setShareDialogOpen(false)} open={shareDialogOpen}>
        <DialogTitle>Share</DialogTitle>
        <DialogContent dividers>
          <div className="share">
            <div className="share__top">
              <TextField value={pageUrl} variant="outlined" />
              <Button variant="contained" className="copy-link-btn">
                Copy Link
              </Button>
            </div>
            <div className="share__body">
              <Tooltip
                children={
                  <FacebookShareButton url={pageUrl}>
                    <FacebookIcon size={SHARE_ICON_SIZE} round />
                  </FacebookShareButton>
                }
                title={"Facebook"}
              />

              <Tooltip
                children={
                  <WhatsappShareButton url={pageUrl}>
                    <WhatsappIcon size={SHARE_ICON_SIZE} round />
                  </WhatsappShareButton>
                }
                title={"Whatsapp"}
              />
              <Tooltip
                children={
                  <TwitterShareButton url={pageUrl}>
                    <TwitterIcon size={SHARE_ICON_SIZE} round />
                  </TwitterShareButton>
                }
                title={"Twitter"}
              />
              <Tooltip
                children={
                  <ViberShareButton url={pageUrl}>
                    <ViberIcon size={SHARE_ICON_SIZE} round />
                  </ViberShareButton>
                }
                title={"Viber"}
              />
              <Tooltip
                children={
                  <EmailShareButton url={pageUrl}>
                    <EmailIcon size={SHARE_ICON_SIZE} round />
                  </EmailShareButton>
                }
                title={"Email"}
              />
              <Tooltip
                children={
                  <RedditShareButton url={pageUrl}>
                    <RedditIcon size={SHARE_ICON_SIZE} round />
                  </RedditShareButton>
                }
                title={"Reddit"}
              />
              <Tooltip
                children={
                  <LinkedinShareButton url={pageUrl}>
                    <LinkedinIcon size={SHARE_ICON_SIZE} round />
                  </LinkedinShareButton>
                }
                title={"LinkedIn"}
              />
              <Tooltip
                children={
                  <TelegramShareButton url={pageUrl}>
                    <TelegramIcon size={SHARE_ICON_SIZE} round />
                  </TelegramShareButton>
                }
                title={"Telegram"}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CertificateView;
