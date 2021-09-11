import { Avatar, List, ListItem, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

import "./PercentageWidget.css";

import { useAvatarStyles, useTextfieldStyles } from "../../data/styles";

const data = [
  { name: "Group A", value: 20 },
  { name: "Group B", value: 100 },
];

interface PercentageWidgetProps {
  title: string;
  image: any;
  pallete: {
    headerBgClr: string;
    bodyBgClr: string;
    pieChart: {
      activeClr: string;
      deactiveClr: string;
    };
    activeFontClr: string;
    deactiveFontClr: string;
  };
  data: {
    targetValue: number;
    totalValue: number;
    pieChart: { name: string; value: number }[];
    list?: any[];
  };
}

const PercentageWidget: React.FC<PercentageWidgetProps> = ({
  title,
  image,
  pallete,
  data,
}) => {
  const [suggestions, setSuggestions] = useState<any[]>();
  const [text, setText] = useState<any>();
  const styles = useTextfieldStyles();
  const avatarStyles = useAvatarStyles();

  const COLORS = [pallete.pieChart.activeClr, pallete.pieChart.deactiveClr];

  useEffect(() => {
    setSuggestions(data.list!);
  }, [data.list]);

  console.log(suggestions);

  return (
    <div className="percentage-widget">
      <div
        className="percentage-widget__header"
        style={{ backgroundColor: pallete.headerBgClr }}
      >
        <PieChart className="pie-chart" width={90} height={90}>
          <Pie
            data={data.pieChart}
            cx={40}
            cy={40}
            innerRadius={30}
            outerRadius={38}
            fill="transparent"
            stroke="none"
            paddingAngle={5}
            dataKey="value"
          >
            {data.pieChart.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>

        <div className="header__middle-col">
          <h3 className="percentage" style={{ color: pallete.activeFontClr }}>
            {Math.round((data.targetValue / data.totalValue) * 100)}%
          </h3>
          <h1 className="value">
            {data.targetValue}
            <span style={{ color: pallete.deactiveFontClr }}>
              /{data.totalValue}
            </span>
          </h1>
          <p className="title">{title}</p>
        </div>
        <img src={image} alt="RightImage" className="right-image" />
      </div>
      {data.list === undefined ||
      data.list === null ||
      data.list.length === 0 ? (
        <></>
      ) : (
        <div
          className="percentage-widget__body"
          style={{ backgroundColor: pallete.bodyBgClr }}
        >
          <TextField
            label="Search member..."
            variant="outlined"
            value={text}
            onChange={(e) => {
              const typed = e.target.value;
              setText(typed);
              if (typed.length === 0 || typed === null || typed === undefined) {
                setSuggestions(data.list);
                return;
              }

              const regex = new RegExp(`^${text}`, `i`);
              setSuggestions(
                data.list
                  ?.sort()
                  .filter((v) => regex.test(v.fName) || regex.test(v.lName))
              );
            }}
            InputProps={{ className: styles.input }}
          />
          <div className="members-container">
            <List className="members-list">
              {suggestions?.map((item, index) => {
                return (
                  <ListItem button key={index}>
                    <Avatar className={avatarStyles.small}>
                      {item?.fName!.substring(0, 1) +
                        item?.lName!.substring(0, 1)}
                    </Avatar>
                    <p style={{ color: pallete.deactiveFontClr }}>
                      {item?.fName! + " " + item?.lName!}
                    </p>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </div>
      )}
    </div>
  );
};

export default PercentageWidget;
