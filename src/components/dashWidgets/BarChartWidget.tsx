import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import colors from "../../data/colors";
import "./BarChartWidget.css";
import { CustomTooltip } from "./MemberRegistrationAnalysisWidget";

const data = [
  {
    name: "Student",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Undergrad",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Graduate",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Other",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

const BarChartWidget = () => {
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
            <XAxis dataKey="name" />
            <YAxis strokeOpacity="0" />
            <Tooltip />
            <Bar dataKey="pv" fill={colors.primaryBrandClr} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bar-chart-widget__footer"></div>
    </div>
  );
};

export default BarChartWidget;
