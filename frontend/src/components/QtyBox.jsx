import { Button } from "@mui/material";
import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export const QtyBox = () => {
  const [qty, setQty] = useState(1)
  return (
    <div className="qtyBox flex items-center relative">
      <input
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        type="number"
        className="w-full h-11 p-2 pl-5 text-sm focus:outline-none border border-gray-400 rounded-md"
        defaultValue={1}
      />

      <div className="flex items-center flex-col justify-between h-10 absolute top-0 right-0 z-50">
        <Button
          onClick={() => setQty(qty + 1)}
          className="!min-w-6  !w-6 !h-5 !text-black !rounded-none"
        >
          {" "}
          <FaAngleUp className="text-sm opacity-55" />
        </Button>
        <Button
          disabled={qty == 0}
          onClick={() => setQty(qty - 1)}
          className="!min-w-6 !w-6 !h-5 !text-black !rounded-none"
        >
          {" "}
          <FaAngleDown className="text-sm opacity-55" />
        </Button>
      </div>
    </div>
  );
};
