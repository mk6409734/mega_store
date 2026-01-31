import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import "./MyAccount.css";
import { MyAccountSidebar } from "../../components/MyAccountSidebar";
import { FrontStore } from "../../Store/Store";
import { useNavigate } from "react-router-dom";
import { Collapse } from "react-collapse";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export const MyAccount = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [changePass, setChangePass] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [openPasspanel, setOpenPassPanel] = useState(false);
  const { islogin, setIsLogin, UpdateUser, ResetPassword } = FrontStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;

    setChangePass((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!islogin) {
      navigate("/");
    }
  }, [islogin]);

  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const mobile = localStorage.getItem("mobile");

    if (name || email || mobile) {
      setFormFields((prev) => ({
        ...prev,
        name: name ? JSON.parse(name) : "",
        email: email ? JSON.parse(email) : "",
        mobile: mobile ? JSON.parse(mobile) : "",
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await UpdateUser({
      name: formFields.name,
      email: formFields.email,
      mobile: formFields.mobile,
    });
    if (res.success) {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("avatar");
      localStorage.removeItem("mobile");
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshtoken");
      setIsLogin(false);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };
  const handlePassSubmit = async (e) => {
    e.preventDefault();
    const res = await ResetPassword({
      email: formFields.email,
      newPassword: changePass.newPassword,
      confirmPassword: changePass.confirmPassword,
    });
    if (res.success) {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("avatar");
      localStorage.removeItem("mobile");
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshtoken");
      setIsLogin(false);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };
  return (
    <section className="py-10 w-full">
      <div className="container mx-auto flex gap-5">
        <div className="col1 w-[20%]">
          <MyAccountSidebar />
        </div>
        <div className="col2 w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md">
            <div className="flex items-center">
              <h2 className="pb-3">My Profie</h2>
              <Button
                onClick={() => setOpenPassPanel(!openPasspanel)}
                className="!ml-auto btn-org !capitalize !mb-3"
              >
                Change Password
              </Button>
            </div>
            <hr />

            <form onSubmit={handleSubmit} className="mt-5">
              <div className="flex items-center gap-5 w-full">
                <div className="w-1/2">
                  <TextField
                    name="name"
                    value={formFields.name}
                    onChange={handleChange}
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
                    name="email"
                    value={formFields.email}
                    onChange={handleChange}
                    disabled={true}
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
                  <PhoneInput
                    defaultCountry="in"
                    value={String(formFields.mobile || "")}
                    onChange={(phone) =>
                      setFormFields((prev) => ({ ...prev, mobile: phone }))
                    }
                    className="w-full"
                    inputClassName="!bg-gray-50 !border !border-gray-300 !text-gray-900 !text-sm !rounded-r-md !focus:ring-blue-500 !focus:border-blue-500 !block !w-full !py-5" 
                  />
                </div>
              </div>
              <br />

              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  className="btn-org !capitalize"
                  variant="contained"
                >
                  Update Profile
                </Button>
              </div>
            </form>
          </div>
          <Collapse isOpened={openPasspanel}>
            <div className="card bg-white p-5 shadow-md rounded-md mt-5">
              <h2 className="pb-3">Change Password</h2>

              <hr />

              <form onSubmit={handlePassSubmit} className="mt-5">
                <div className="flex items-center gap-5 w-full">
                  <div className="w-1/2">
                    <TextField
                      name="newPassword"
                      value={changePass.newPassword}
                      onChange={handleChange2}
                      label="New Password"
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
                      name="confirmPassword"
                      value={changePass.confirmPassword}
                      onChange={handleChange2}
                      label="Confirm Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                    />
                  </div>
                </div>

                <br />

                <div className="flex items-center gap-4">
                  <Button
                    type="submit"
                    className="btn-org !capitalize"
                    variant="contained"
                  >
                    Change Password
                  </Button>
                </div>
              </form>
            </div>
          </Collapse>
        </div>
      </div>
    </section>
  );
};
