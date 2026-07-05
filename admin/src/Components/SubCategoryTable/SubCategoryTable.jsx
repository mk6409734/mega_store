import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import { LuTrash2 } from "react-icons/lu";
import { MdOutlineModeEdit, MdExpandMore } from "react-icons/md";
import Chip from "@mui/material/Chip";
import { adminStore } from "../../Store/Store";
import { EditSubCategory } from "../EditSubCategory/EditSubCategory";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function SubCategoryTable() {
  const {
    GetCategory,
    DeleteCategory,
    handleClickOpen,
    categories,
    setCategories,
  } = adminStore();
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const fetchCategories = async () => {
    const res = await GetCategory();
    if (res && res.data) {
      setCategories(res.data);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async () => {
    if (deleteId) {
      await DeleteCategory(deleteId);
      handleClose();
      fetchCategories();
    }
  };

  const handleEdit = (subCat) => {
    handleClickOpen(EditSubCategory, {
      categoryData: subCat,
      title: "Edit SubCategory",
    });
  };

  const ActionButtons = ({ item }) => (
    <div className="flex items-center gap-2">
      <Tooltip title="edit" placement="top">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(item);
          }}
          className="!w-8 !h-8 !bg-blue-50 !border !border-blue-200 !min-w-[32px] hover:!bg-blue-100 dark:!bg-slate-700 dark:!border-slate-600"
          style={{ minWidth: "32px" }}
        >
          <MdOutlineModeEdit className="text-blue-600 dark:text-blue-400" />
        </Button>
      </Tooltip>

      <Tooltip title="delete" placement="top">
        <Button
          onClick={(e) => {
             e.stopPropagation();
             handleClickDelete(item._id);
          }}
          className="!w-8 !h-8 !bg-red-50 !border !border-red-200 !min-w-[32px] hover:!bg-red-100 dark:!bg-slate-700 dark:!border-slate-600"
          style={{ minWidth: "32px" }}
        >
          <LuTrash2 className="text-red-600 dark:text-red-400" />
        </Button>
      </Tooltip>
    </div>
  );

  return (
    <div className="rounded-md border bg-card text-card-foreground shadow-sm p-4">
      {categories.length > 0 ? (
        categories.map((parent) => (
          <Accordion key={parent._id} className="mb-2 border !shadow-none before:!hidden dark:bg-slate-800 dark:border-slate-700">
            <AccordionSummary
              expandIcon={<MdExpandMore className="text-2xl" />}
              aria-controls={`panel-${parent._id}-content`}
              id={`panel-${parent._id}-header`}
              className="bg-gray-50 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center gap-4">
                    {parent.images && parent.images.length > 0 && (
                        <div className="w-10 h-10 rounded overflow-hidden border">
                            <LazyLoadImage src={parent.images[0]} effect="blur" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <Typography className="font-semibold text-gray-700 dark:text-gray-200">
                        {parent.name}
                    </Typography>
                </div>
                {/* Optional: Add actions for Root if desired, but user focused on subcategories */}
              </div>
            </AccordionSummary>
            <AccordionDetails className="bg-white dark:bg-slate-800 p-0">
                {parent.children && parent.children.length > 0 ? (
                    <div className="flex flex-col">
                        {parent.children.map((child) => (
                            <div key={child._id} className="border-b last:border-b-0 dark:border-slate-700">
                                {/* Level 2 Item */}
                                <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                    <div className="flex items-center gap-3 pl-4">
                                         <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                         <span className="font-medium">{child.name}</span>
                                    </div>
                                    <ActionButtons item={child} />
                                </div>

                                {/* Level 3 Items (Nested) */}
                                {child.children && child.children.length > 0 && (
                                    <div className="bg-gray-50 dark:bg-slate-900/50 pl-12 py-2">
                                        {child.children.map((grandChild) => (
                                            <div key={grandChild._id} className="flex items-center justify-between p-2 pr-3 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md mx-2 mb-1">
                                                 <div className="flex items-center gap-3">
                                                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                                      <span className="text-sm text-gray-600 dark:text-gray-300">{grandChild.name}</span>
                                                 </div>
                                                 <ActionButtons item={grandChild} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">No subcategories</div>
                )}
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <div className="p-8 text-center text-gray-500">No categories found.</div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this category?
        </DialogTitle>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
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
