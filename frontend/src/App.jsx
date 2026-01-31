import React, { useState } from "react";
import "./App.css";
import { createContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { ProductZoom } from "./components/ProductZoom";
import { ProductDetailComponent } from "./components/ProductDetailComponent";
import { IoMdClose } from "react-icons/io";
import { Router } from "./Router";
import { Toaster } from "react-hot-toast";

export const MyContext = createContext();

function App() {
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("lg");
  const [opencart, setOpenCart] = useState(false);
  

  const toggleCartPanel = (newOpen) => () => {
    setOpenCart(newOpen);
  };

  const handleCloseProductDialog = () => {
    setOpenProductDialog(false);
  };

  const values = {
    setOpenProductDialog,
    setOpenCart,
    toggleCartPanel,
    opencart,
  };

  return (
    <>
      <Toaster />
      <Router values={values} context={MyContext} />

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openProductDialog}
        onClose={handleCloseProductDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className="flex items-center w-full relative">
            <Button
              onClick={handleCloseProductDialog}
              className="!absolute !right-0 !top-0 !text-black !rounded-full !bg-[#f1f1f1] !w-10 !min-w-10 !h-10"
            >
              <IoMdClose />
            </Button>
            <div className="col1 w-[40%]">
              <ProductZoom />
            </div>
            <div className="col2 w-[60%] py-8 px-8 productContent">
              <ProductDetailComponent />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
