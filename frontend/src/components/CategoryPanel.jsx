import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { RiMenu2Fill } from "react-icons/ri";
import { TfiAngleDown } from "react-icons/tfi";
import { IoCloseSharp } from "react-icons/io5";

import { CategoryCollapse } from "./CategoryCollapse";

export const CategoryPanel = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <h1 className="p-3 text-lg flex items-center justify-between font-semibold">
        Shop By Categories{" "}
        <IoCloseSharp
          className="cursor-pointer text-xl"
          onClick={toggleDrawer(false)}
        />
      </h1>

      <CategoryCollapse />
      <CategoryCollapse />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)} className="!text-black gap-2 w-full">
        <RiMenu2Fill className="text-xl" />
        Shop By Categories
        <TfiAngleDown className="font-bold ml-auto" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};
