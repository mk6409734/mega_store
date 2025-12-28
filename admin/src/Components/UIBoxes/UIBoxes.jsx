import React from "react";

import { IoStatsChartSharp } from "react-icons/io5";
export const UIBoxes = ({title, amount, icon, icon2}) => {
  return (
    <div className="py-4 cursor-pointer hover:bg-gray-200 bg-white rounded-md border border-gray-300 flex justify-center items-center gap-4">
      {icon}
      <div className="w-[50%] font-urbanist">
        <h1>{title}</h1>
        <b className="text-lg">${amount}</b>
      </div>
      {icon2}
    </div>
  );
};
