import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Paper from "@material-ui/core/Paper";
import colors from "../data/colors";
import ActivityDto from "../types/models/ActivityDto";

import "./ActivityTimeline.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "0.5em 2em",
    backgroundColor: colors.secondaryBgClr,
    color: colors.primaryFontClr,
    width: "20em",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const ActivityTimeline = ({
  topic,
  activities,
}: {
  topic: string;
  activities: ActivityDto[] | undefined;
}) => {
  const classes = useStyles();

  return (
    <div className="activity-timeline-container">
      <div className="activity-timeline-container__content">
        {activities?.length === 0 ? (
          <></>
        ) : (
          <>
            <h3 className="timeline__topic">{topic}</h3>
            <Timeline className="activity-timeline" align="left">
              {activities?.map((activity, index) => {
                return (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent>
                      <p className="timeline-time">{activity.time}</p>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Paper elevation={3} className={classes.paper}>
                        <div className="activity-content">
                          <div className="activity-content__row-1">
                            <p className="activity-content-text-block interactive">
                              {activity.admin.name}
                            </p>
                            <p className="activity-content-text-block">
                              {activity.type}
                            </p>
                            <p className="activity-content-text-block interactive">
                              {activity.subject}
                            </p>
                          </div>
                          {topic === "Older" && (
                            <div className="activity-content__row-2">
                              <p className="activity-content-text-block">
                                {activity.date}
                              </p>
                            </div>
                          )}
                        </div>
                      </Paper>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Timeline>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityTimeline;
