import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import colors from "../../data/colors";
import "./BarChartWidget.css";

const dataa = [
  {
    name: "Student",
    //uv: 4000,
    pv: 2,
    //amt: 2400,
  },
  {
    name: "Undergrad",
    //uv: 3000,
    pv: 13,
    //amt: 2210,
  },
  {
    name: "Graduate",
    //uv: 2000,
    pv: 9,
    //amt: 2290,
  },
  {
    name: "Other",
    //uv: 2780,
    pv: 3,
    //amt: 2000,
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
      </div>
    );
  }

  return null;
};

const BarChartWidget = ({ data }: { data: any[] | undefined[] }) => {
  return (
    <div className="bar-chart-widget">
      <div className="bar-chart-widget__header">
        <h3 className="title">Member Distribution</h3>
      </div>
      <div className="bar-chart-widget__body">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              strokeOpacity="0.2"
              vertical={false}
            />
            <XAxis dataKey="role" />
            <YAxis strokeOpacity="0" dataKey="numOfUsers" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="numOfUsers" fill={colors.primaryBrandClr} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bar-chart-widget__footer"></div>
    </div>
  );
};

export default BarChartWidget;
