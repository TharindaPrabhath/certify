import { Breadcrumbs, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import ActivityTimeline from "../components/ActivityTimeline";
import colors from "../data/colors";
import ActivityDto from "../types/models/ActivityDto";
import useLocalStorage from "../utils/useLocalStorage";

import useSWR from "swr";
import requests from "../data/requests";
import useAxios from "../utils/axios";

import "./Activity.css";

export interface ActivityWrapper {
  today: ActivityDto[];
  yesterday: ActivityDto[];
  older: ActivityDto[];
  privateActivities: ActivityDto[];
}

const Activity = () => {
  const { getAdmin } = useLocalStorage();
  const axios = useAxios();

  const { data: activities } = useSWR(requests.fetchActivities, (url: string) =>
    axios
      .get(url, {
        params: {
          admin_id: getAdmin().id,
        },
      })
      .then((r) => r.data)
      .catch((err) => console.error(err))
  );

  return (
    <div className="activity-screen">
      <div className="activity-screen__content">
        <div className="activity-timelines-container">
          <div className="top">
            <div className="left-col">
              <h2>Users</h2>
              <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
                <Link to="/dashboard">Dashboard</Link>
                <Typography style={{ color: colors.dimmedClr }}>
                  Activity
                </Typography>
              </Breadcrumbs>
            </div>
          </div>
          <ActivityTimeline topic="Today" activities={activities?.today} />
          <ActivityTimeline
            topic="Yesterday"
            activities={activities?.yesterday}
          />
          <ActivityTimeline topic="Older" activities={activities?.older} />
        </div>
      </div>
    </div>
  );
};

export default Activity;
