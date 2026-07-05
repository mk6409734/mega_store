import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import { FaRegEye } from "react-icons/fa6";
import { LuTrash2 } from "react-icons/lu";
import { MdOutlineModeEdit } from "react-icons/md";
import { adminStore } from "../../Store/Store";
import React, { useEffect, useMemo, useState } from "react";
import { CateoryApi } from "../../utils/api";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { EditCategory } from "../EditCategory/EditCategory";
import Checkbox from "@mui/material/Checkbox";

export function CategoryTable() {
  const {
    GetCategory,
    DeleteCategory,
    categories,
    setCategories,
    handleClickOpen,
  } = adminStore();

  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null); // For single delete
  const [selected, setSelected] = useState([]);

  const handleClickopen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  useEffect(() => {
    let active = true;
    const load = async () => {
      const res = await GetCategory();
      // console.log("res", res);
      if (!active) return;
      setCategories(res?.data || []);
    };
    load();
    return () => {
      active = false;
    };
  }, [GetCategory]);

  const handleDelete = async (categoryId) => {
    await DeleteCategory(categoryId);
    // Refresh categories list
    const updatedRes = await GetCategory();
    setCategories(updatedRes?.data || []);
  };

  const rows = useMemo(() => {
    const flat = [];
    const walk = (items, level = 0) => {
      if (!Array.isArray(items)) return;
      for (const item of items) {
        flat.push({ ...item, level });
        if (item.children?.length) {
          walk(item.children, level + 1);
        }
      }
    };
    walk(categories);
    return flat;
  }, [categories]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else {
      newSelected = selected.filter((item) => item !== id);
    }

    setSelected(newSelected);
  };

  const handleDeleteSelected = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selected.length} items?`,
      )
    ) {
      // Filter to find effective roots among selected
      // We only delete items whose parents are NOT also selected.
      const effectiveRoots = selected.filter((id) => {
        const item = rows.find((r) => r._id === id);
        if (item && item.parentId && selected.includes(item.parentId)) {
          return false;
        }
        return true;
      });

      await Promise.all(effectiveRoots.map((id) => DeleteCategory(id)));
      setSelected([]);
      const updatedRes = await GetCategory();
      setCategories(updatedRes?.data || []);
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div className="rounded-md border bg-card text-card-foreground shadow-sm">
      {selected.length > 0 && (
        <div className="p-4 bg-red-50 flex items-center justify-between">
          <span className="text-red-700 font-medium">
            {selected.length} selected
          </span>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </Button>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow className="dark:!text-amber-50">
            <TableHead className="w-[50px]">
              <Checkbox
                color="primary"
                indeterminate={
                  selected.length > 0 && selected.length < rows.length
                }
                checked={rows.length > 0 && selected.length === rows.length}
                onChange={handleSelectAllClick}
              />
            </TableHead>
            <TableHead className="">Images</TableHead>
            <TableHead className="">Category Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => {
            const isItemSelected = isSelected(row._id);
            return (
              <TableRow key={row._id} selected={isItemSelected}>
                <TableCell className="p-0 pl-4">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    onChange={(event) => handleClick(event, row._id)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {row.images?.[0] ? (
                    <div className="w-16 h-16 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={row.images[0]}
                        alt={row.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-40 h-24 bg-gray-100 border border-dashed border-gray-300" />
                  )}
                </TableCell>
                <TableCell>
                  <Chip
                    className="dark:!text-amber-50"
                    label={`${"— ".repeat(row.level)}${row.name}`}
                  />
                </TableCell>
                <TableCell>
                  {" "}
                  <div className="flex items-center gap-1">
                    <Tooltip title="edit" placement="top">
                      <Button
                        onClick={() =>
                          handleClickOpen(EditCategory, {
                            title: "Edit Category",
                            categoryData: row,
                          })
                        }
                        className="!w-8 !h-8 bg-gray-200 !border !border-gray-300 !min-w-8 hover:!border-blue-500"
                      >
                        <MdOutlineModeEdit className="dark:!text-amber-50 text-gray-600" />
                      </Button>
                    </Tooltip>

                    <Tooltip title="delete" placement="top">
                      <Button
                        className="!w-8 !h-8 bg-gray-200 !border !border-gray-300 !min-w-8 hover:!border-blue-500"
                        onClick={() => handleClickopen(row._id)}
                      >
                        <LuTrash2 className="dark:!text-amber-50 text-gray-600" />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Dialog for Single Delete */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this category? This action cannot be
          undone.
        </DialogTitle>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (deleteId) {
                await handleDelete(deleteId);
                handleClose();
              }
            }}
            color="error"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
