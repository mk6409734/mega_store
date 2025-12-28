import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { AddProduct } from "../AddProduct/AddProduct";
import { adminStore } from "../../Store/Store";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function FullDialog({ title, Component, children }) {

  const { open, handleClose, dialogComponent, dialogProps } = adminStore();

  // Content rendering priority:
  // 1) If a `Component` prop is explicitly passed to <FullDialog Component={...} /> use that
  // 2) Else if store.dialogComponent is set (via handleClickOpen(component)) use that
  // 3) Else if children present use children
  // 4) Else fallback to <AddProduct />
  const Content = Component ? (
    <Component {...(dialogProps || {})} />
  ) : dialogComponent ? (
    // dialogComponent is stored in the store (a component reference)
    React.createElement(dialogComponent, { ...(dialogProps || {}) })
  ) : children ? (
    children
  ) : (
    <AddProduct />
  );

  // Title priority: explicit `title` prop > dialogProps.title (set via handleClickOpen) > empty
  const displayedTitle = title ?? (dialogProps && dialogProps.title) ?? "";

  return (
    <React.Fragment>
      <Dialog
        sx={{ zIndex: 50 }}
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {displayedTitle}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        {Content}
      </Dialog>
    </React.Fragment>
  );
}
