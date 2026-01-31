import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import "./index.css";
import { MyAccountSidebar } from "../../components/MyAccountSidebar";
import { FrontStore } from "../../Store/Store";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { FaCloudUploadAlt } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export const MyAddress = () => {
  const [data, setdata] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: false,
  });
  const { AddAddress, GetAddress } = FrontStore();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AddAddress(data);
  };
  useEffect(() => {
    const fetchAddress = async () => {
      const res = await GetAddress();
      if (res?.success && res?.address?.length > 0) {
        const addr = res.address[0]; // Assuming GetAddress returns an array of addresses
        setdata({
          address_line1: addr.address_line1 || "",
          city: addr.city || "",
          state: addr.state || "",
          pincode: addr.pincode || "",
          country: addr.country || "",
          mobile: addr.mobile || "",
          status: addr.status || false,
        });
      }
    };
    fetchAddress();
  }, []);
  return (
    <section className="py-10 w-full">
      <div className="container mx-auto flex gap-5">
        <div className="col1 w-[20%]">
          <MyAccountSidebar />
        </div>
        <div className="col2 w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md">
            <div className="flex items-center">
              <h2 className="pb-3">My Address</h2>
            </div>
            <hr />

            <form onSubmit={handleSubmit} className="">
              <div className="grid grid-cols-2 gap-5 mb-3">
                <div>
                  <h1 className="mb-1 dark:text-white">Address Line1</h1>

                  <TextField
                    label="Address_line1"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="address_line1"
                    value={data.address_line1}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <h1 className="mb-1 dark:text-white">City</h1>

                  <TextField
                    label="City"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    type="text"
                    name="city"
                    value={data.city}
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5 mb-3">
                <div>
                  <h1 className="mb-1 dark:text-white">State</h1>

                  <TextField
                    label="State"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    type="text"
                    name="state"
                    value={data.state}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <h1 className="mb-1 dark:text-white">Pincode</h1>

                  <TextField
                    label="Pincode"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    type="text"
                    name="pincode"
                    value={data.pincode}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <h1 className="mb-1 dark:text-white">Country</h1>

                  <TextField
                    label="Country"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    type="text"
                    name="country"
                    value={data.country}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-3">
                <div>
                  <h1 className="mb-1 dark:text-white">Mobile</h1>

                  <PhoneInput
                    defaultCountry="in"
                    value={String(data.mobile || "")}
                    onChange={(phone) => {
                      setdata((prev) => ({ ...prev, mobile: phone }));
                    }}
                    className="w-full"
                    inputClassName="!bg-gray-50 !border !border-gray-300 !text-gray-900 !text-sm !rounded-r-lg !focus:ring-blue-500 !focus:border-blue-500 !block !w-full !py-5 !mt-1.5"
                  />
                </div>
                <div>
                  <FormControl sx={{ mt: 4, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">Status</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      name="status"
                      value={data.status}
                      onChange={handleInput}
                    >
                      {" "}
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={true}>True</MenuItem>
                      <MenuItem value={false}>False</MenuItem>
                    </Select>
                  </FormControl>

                  {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Select
                      name="status"
                      value={data.status}
                      onChange={handleInput}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value={true}>True</MenuItem>
                      <MenuItem value={false}>False</MenuItem>
                    </Select>
                  </FormControl> */}
                </div>
              </div>

              <br />

              <Button
                type="submit"
                className="!bg-primary !rounded-md !px-4 !py-2 !text-white !flex !items-center !gap-2"
              >
                <FaCloudUploadAlt className="text-xl" />
                Update
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
