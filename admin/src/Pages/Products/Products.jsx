import Button from "@mui/material/Button";
import { GoPlus } from "react-icons/go";
import ProductTable2 from "../../Components/ProductTable2/ProductTable2";
import { adminStore } from "../../Store/Store";
import { AddProduct } from "../../Components/AddProduct/AddProduct";
export const Products = () => {
  const { handleClickOpen } = adminStore();

  return (
    <div className="bg-gray-100 dark:bg-zinc-700 px-5 py-4 flex-1 overflow-y-auto">
      <div className="flex items-center px-3 py-2 justify-between">
        <div>
          <h1 className="text-2xl font-roboto dark:text-amber-50 font-semibold">
            Products
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <Button className="!bg-green-500 !text-white !px-3 !py-2">
            Export
          </Button>
          <Button
            onClick={() =>
              handleClickOpen(AddProduct, { title: "Add Product" })
            }
            className="!flex !gap-2 !items-center"
            variant="contained"
          >
            <GoPlus className="text-lg" />
            Add Product
          </Button>{" "}
          {/* single FullDialog instance in Sidebar will render AddProduct when opened */}
        </div>
      </div>

      <ProductTable2 />
    </div>
  );
};
