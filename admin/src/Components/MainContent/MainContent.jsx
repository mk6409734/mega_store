import React from "react";
import { DashboardBoxes } from "../../Components/DashboardBoxes/DashboardBoxes";
import { FiPlus } from "react-icons/fi";
import Button from "@mui/material/Button";
import DetailsTable from "../../Components/DetailsTable/DetailsTable";
import ProductTable from "../../Components/ProductTable/ProductTable";
import LineCharts from "../LineCharts/LineCharts";
import { adminStore } from "../../Store/Store";
import FullDialog from "../FullDialog/FullDialog";
import { AddProduct } from "../AddProduct/AddProduct";

export const MainContent = () => {
  const { handleClickOpen } = adminStore();

  return (
    <main className="flex-1 py-4 px-5 dark:bg-zinc-700 bg-gray-100 h-full overflow-auto">
      <div className="p-5 border border-gray-300 flex flex-col md:flex-row items-center justify-between mb-5 rounded-md bg-white">
        <div className="info flex flex-col pl-5">
          <h1 className="text-4xl font-bold">
            Good Morning, <br />
            Cameron🖐️
          </h1>
          <p className="mt-8 text-gray-500">
            Here's What happening on your store today. See the statistics at
            once.
          </p>
          <div className="mt-12">
            <Button
              onClick={() => handleClickOpen(AddProduct, { title: "Add Product" })}
              className="!flex !gap-2"
              variant="contained"
            >
              <FiPlus />
              Add Product
            </Button>
          </div>
        </div>
        <div>
          <img src="./mobile2.png" alt="mobile shoping" className="w-80" />
        </div>
      </div>

      <DashboardBoxes />
      <ProductTable />
      <DetailsTable />
      <LineCharts />
    </main>
  );
};
