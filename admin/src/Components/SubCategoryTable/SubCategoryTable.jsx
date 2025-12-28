import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { FaRegEye } from "react-icons/fa6";
import { LuTrash2 } from "react-icons/lu";
import { MdOutlineModeEdit } from "react-icons/md";
import Chip from "@mui/material/Chip";
const invoices = [
  {
    id: 1,
    // file exists at admin/public/product1.png — reference from public root
    image: "/product1.png",
    action: "Paid",
  },
];

export function SubCategoryTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Category Images</TableHead>
          <TableHead className="">Category Name</TableHead>
          <TableHead className="">Sub Category Name</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">
              <img
                src={invoice.image}
                alt="product"
                className="w-40 h-auto object-contain"
              />
            </TableCell>
            <TableCell>
              <div>
                <Chip label="Men"  />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Chip label="Men" color="primary" />
                <Chip label="Women" color="secondary" />
                <Chip label="Kids" color="success" />
              </div>
            </TableCell>
            <TableCell>
              {" "}
              <div className="flex items-center gap-1">
                <Tooltip title="edit" placement="top">
                  <Button className="!w-8 !h-8 bg-gray-200 !border !border-gray-300 !min-w-8 hover:!border-blue-500">
                    <MdOutlineModeEdit className="text-gray-600" />
                  </Button>
                </Tooltip>
                
                <Tooltip title="delete" placement="top">
                  <Button className="!w-8 !h-8 bg-gray-200 !border !border-gray-300 !min-w-8 hover:!border-blue-500">
                    <LuTrash2 className="text-gray-600" />
                  </Button>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
