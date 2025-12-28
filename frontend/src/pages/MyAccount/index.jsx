import React from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import "./index.css";
import { MyAccountSidebar } from "../../components/MyAccountSidebar";

export const MyAccount = () => {
  return (
    <section className="py-10 w-full">
      <div className="container mx-auto flex gap-5">
        <div className="col1 w-[20%]">
          <MyAccountSidebar/>
        </div>
        <div className="col2 w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md">
            <h2 className="pb-3">My Profie</h2>
            <hr />

            <form className="mt-5">
              <div className="flex items-center gap-5 w-full">
                <div className="w-1/2">
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>
                <div
                  className="
                w-1/2"
                >
                  <TextField
                    label="Email"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex items-center mt-5">
                <div
                  className="
                w-1/2"
                >
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>
              </div>
              <br />

              <div className="flex items-center gap-4">
                <Button className="btn-org !capitalize" variant="contained">
                  Save
                </Button>
                <Button
                  className="!capitalize !border !border-primary !text-primary"
                  variant="outlined"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
