import { useEffect, useState } from "react";
import "./ProgressbarWidget.css";

interface ProgressbarWidgetProps {
  title: string;
  categories: string[];
  colors: string[];
  values: number[];
}

const CustomLinearProgress = ({
  bgColor,
  fillColor,
  value,
}: {
  bgColor: string;
  fillColor: string;
  value: number;
}) => {
  return (
    <div
      className="custom-linear-progress"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="custom-linear-progress__fill"
        style={{
          backgroundColor: fillColor,
          width: value === 0 ? 0 : `${value}%`,
        }}
      ></div>
    </div>
  );
};

const ProgressbarWidget: React.FC<ProgressbarWidgetProps> = ({
  title,
  categories,
  values,
  colors,
}) => {
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    setTotalValue(values.reduce((partialSum, value) => partialSum + value));
  }, [values]);

  return (
    <div className="progressbar-widget">
      <div className="progressbar-widget__header">
        <h3 className="header__title">{title}</h3>
      </div>
      <div className="progressbar-widget__body">
        {categories.map((i, index) => {
          return (
            <CustomLinearProgress
              key={index}
              value={Math.round((values[index] / totalValue) * 100)}
              bgColor="#333D49"
              fillColor={colors[index]}
            />
          );
        })}
      </div>
      <div className="progressbar-widget__footer">
        {categories.map((i, index) => {
          return (
            <div key={index} className="ref-section">
              <div className="ref-section__row-1">
                <div
                  className="dot"
                  style={{ backgroundColor: colors[index] }}
                ></div>
                <p className="category-name">{i}</p>
              </div>
              <div className="ref-section__row-2">
                <h2>{values[index]}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressbarWidget;
