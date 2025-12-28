import { adminStore } from "../../Store/Store";
import Button from "@mui/material/Button";
import { GoPlus } from "react-icons/go";
import FullDialog from "../../Components/FullDialog/FullDialog";
import { HomeSliderProductTable } from "../../Components/HomeSliderProductTable/HomeSliderProductTable";
import { AddCategory } from "../../Components/AddCategory/AddCategory";
import { CategoryTable } from "../../Components/CategoryTable/CategoryTable";
import { SubCategoryTable } from "../../Components/SubCategoryTable/SubCategoryTable";
import { AddSubCategory } from "../../Components/AddSubCategory/AddSubCategory";

const SubCategoryList = () => {
  const { handleClickOpen } = adminStore();
  return (
    <div className="bg-gray-100 dark:bg-zinc-700 px-5 py-4 flex-1 overflow-y-auto">
      <div className="flex items-center px-3 py-2 justify-between">
        <div>
          <h1 className="text-2xl font-roboto dark:text-amber-50 font-semibold">
            Sub Categorys list
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <Button className="!bg-green-500 !text-white !px-3 !py-2">
            Export
          </Button>
          <Button
            onClick={() =>
              handleClickOpen(AddSubCategory, { title: "Add New Sub Category" })
            }
            className="!flex !gap-2 !items-center"
            variant="contained"
          >
            <GoPlus className="text-lg" />
            Add Sub New Category
          </Button>{" "}
          {/* FullDialog is a single instance mounted in the Sidebar and will render the component passed to handleClickOpen */}
        </div>
      </div>

      <SubCategoryTable />
    </div>
  );
};
export default SubCategoryList;
