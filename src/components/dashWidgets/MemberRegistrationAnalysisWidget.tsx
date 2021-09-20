import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import colors from "../../data/colors";

import "./MemberRegistrationAnalysisWidget.css";

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    //amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    //amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    //amt: 2290,
  },
  {
    name: "April",
    uv: 2780,
    pv: 3908,
    //amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    //amt: 2181,
  },
  {
    name: "June",
    uv: 2390,
    pv: 3800,
    //amt: 2500,
  },
  {
    name: "July",
    uv: 3490,
    pv: 4300,
    //amt: 2100,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#161C24",
          color: "#e0e0e0",
          padding: "1em",
          borderRadius: "1em",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "1em",
              height: "1em",
              backgroundColor: colors.primaryBrandClr,
              borderRadius: "50%",
              marginRight: "0.5em",
            }}
          />
          {`Members : ${payload[0].value}`}
        </div>
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "1em",
              height: "1em",
              backgroundColor: "#F4DE02",
              borderRadius: "50%",
              marginRight: "0.5em",
            }}
          />
          {`Admins : ${payload[1].value}`}
        </div> */}
      </div>
    );
  }

  return null;
};

const MemberRegistrationAnalysisWidget = ({
  data,
}: {
  data: any[] | undefined[];
}) => {
  const [yearRegistration, setYearRegistration] = useState<any[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [year, setYear] = useState<number | unknown>(0);

  useEffect(() => {
    if (data !== undefined && data.length !== 0) {
      let yearsArr: number[] = [];
      data.map((i) => {
        yearsArr.push(i.year);
        //return i;
      });
      setYear(yearsArr[0]);
      setYears(yearsArr);
      setYearRegistration(data[0].monthRegistrations);
    }
  }, [data]);

  return (
    <div className="mra-widget">
      <div className="mra-widget__header">
        <h3 className="title">Member Registration</h3>
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-filled-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            labelWidth={35}
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              years.map((i, index) => {
                if (i === e.target.value)
                  setYearRegistration(data[index].monthRegistrations);
              });
            }}
          >
            {years.map((year, index) => {
              return (
                <MenuItem key={index} value={year}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className="mra-widget__body">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={730}
            height={250}
            data={yearRegistration}
            margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              strokeOpacity="0.2"
              vertical={false}
            />
            <XAxis dataKey="month" />
            <YAxis strokeOpacity="0" dataKey="numOfRegistrations" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="numOfRegistrations"
              stroke="#F4DE02"
              strokeWidth="3px"
            />
            {/* <Line
              type="monotone"
              dataKey="uv"
              stroke={colors.primaryBrandClr}
              strokeWidth="3px"
            /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MemberRegistrationAnalysisWidget;
