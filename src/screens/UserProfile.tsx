import React from "react";

import "./UserProfile.css";

import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import DateRangeIcon from "@material-ui/icons/DateRange";
import {
  AppBar,
  Box,
  List,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import UserCell from "../components/UserCell";

const userProfileAvatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
const userProfileCover =
  "https://images.pexels.com/photos/2684383/pexels-photo-2684383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const UserProfile = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className="user-profile">
      <div className="user-profile__content">
        <div className="left-col">
          <div className="user-profile__header">
            <div
              className="cover-img"
              style={{
                backgroundImage: `url(${userProfileCover})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                height: "10em",
                //   filter: "blur(0.2em)",
              }}
            >
              <img src={userProfileAvatar} alt="Profile Img" />
            </div>

            <div className="brief-info">
              <div className="brief-info__content">
                <h2 className="name">Wonder Woman</h2>
                <div className="other">
                  <p className="role">
                    <PersonOutlineIcon />
                    Student
                  </p>
                  <p className="added">
                    <DateRangeIcon />
                    added 2021 Aug 23
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="user-profile__body">
            <div className="body__content">
              <AppBar position="static" color="transparent">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Info" {...a11yProps(0)} />
                  <Tab label="Achievements" {...a11yProps(1)} />
                  <Tab label="Analytics" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  Item One
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  Item Two
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  Item Three
                </TabPanel>
              </SwipeableViews>
            </div>
          </div>
        </div>

        <div className="right-col">
          <div className="right-col__content">
            <div className="topic">
              <h4>Users (7)</h4>
            </div>
            <div className="users-container">
              <List>
                <UserCell firstName="Tharinda" lastName="Prabhath" />
                <UserCell firstName="Lasana" lastName="Sanketh" />
                <UserCell firstName="Lishitha" lastName="Alahakoon" />
                <UserCell firstName="Chamath" lastName="Roopa" />
                <UserCell firstName="Hasitha" lastName="Gal" />
                <UserCell firstName="Janani" lastName="Push" />
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
