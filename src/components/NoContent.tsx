import React from "react";
import colors from "../data/colors";

const NoContent = () => {
  return (
    <div
      style={{
        backgroundColor: colors.secondaryBgClr,
        color: colors.primaryFontClr,
        textAlign: "center",
        padding: "2em",
        borderRadius: "1em",
      }}
    >
      <p>No content was found</p>
    </div>
  );
};

export default NoContent;
