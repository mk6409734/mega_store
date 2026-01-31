import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import "./addaddress.css";
import { UploadBox } from "../UploadBox/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { adminStore } from "../../Store/Store";

export const AddAddress = () => {
  const [data, setdata] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: false,
  });
  const { AddAddess, GetAddress } = adminStore();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AddAddess(data);
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
    <section className="p-8 dark:bg-zinc-700">
      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-2 gap-5 mb-3">
          <div>
            <h1 className="mb-1 dark:text-white">Address Line1</h1>

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="address_line1"
              value={data.address_line1}
              onChange={handleInput}
            />
          </div>
          <div>
            <h1 className="mb-1 dark:text-white">City</h1>

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="state"
              value={data.state}
              onChange={handleInput}
            />
          </div>
          <div>
            <h1 className="mb-1 dark:text-white">Pincode</h1>

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="pincode"
              value={data.pincode}
              onChange={handleInput}
            />
          </div>
          <div>
            <h1 className="mb-1 dark:text-white">Country</h1>

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                console.log("mobile changed:", phone);
              }}
              className="w-full"
              inputClassName="!bg-gray-50 !border !border-gray-300 !text-gray-900 !text-sm !rounded-r-lg !focus:ring-blue-500 !focus:border-blue-500 !block !w-full !py-5.5 dark:!bg-gray-700 dark:!border-gray-600 dark:!placeholder-gray-400 dark:!text-white dark:!focus:ring-blue-500 dark:!focus:border-blue-500 !mt-1.5"
            />
          </div>
          <div>
            <h1 className="mb-1 dark:text-white">Status</h1>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
            </FormControl>
          </div>
        </div>

        <br />

        <Button
          type="submit"
          className="!bg-blue-600 !rounded-md !px-4 !py-2 !text-white !flex !items-center !gap-2"
        >
          <FaCloudUploadAlt className="text-xl" />
          Publish
        </Button>
      </form>
    </section>
  );
};
