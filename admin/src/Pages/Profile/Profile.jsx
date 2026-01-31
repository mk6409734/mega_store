import toast from "react-hot-toast";
import { adminStore } from "../../Store/Store";
import CircularProgress from "@mui/material/CircularProgress";
import { authAPI } from "../../utils/api";
import { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IoMdClose } from "react-icons/io";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Collapse } from "react-collapse";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { AddAddress } from "../../Components/AddAddress/AddAddress";
import FullDialog from "../../Components/FullDialog/FullDialog";

export const Profile = () => {
  const {
    islogin,
    Logout: handleLogout,
    setIsLogin,
    UpdateUser,
    ResetPassword,
    handleClickOpen,
  } = adminStore();
  const [uploading, setUploading] = useState(false);

  const name = JSON.parse(localStorage.getItem("name")) || "Guest";
  const email =
    JSON.parse(localStorage.getItem("email")) || "email@example.com";
  const avatar = localStorage.getItem("avatar")
    ? JSON.parse(localStorage.getItem("avatar"))
    : null;

  const OnChangeFile = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!validTypes.includes(file.type.toLowerCase())) {
      toast.error("Please select a valid jpg, png, or webp image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await authAPI.uploadImage(formData);

      if (res.data.success) {
        toast.success(res.data.message || "Image Uploaded Successfully");
        const newAvatar = res.data.avatar;
        localStorage.setItem("avatar", JSON.stringify(newAvatar));
      } else {
        toast.error(res.data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during upload",
      );
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleRemovePhoto = async () => {
    try {
      setUploading(true);
      await authAPI.removeAvatar(avatar);
      toast.success("Avatar removed successfully");
      localStorage.removeItem("avatar");
    } catch (err) {
      console.error("Remove avatar failed:", err);
    } finally {
      setUploading(false);
    }
  };

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
        name: name ? JSON.parse(name) || "" : "",
        email: email ? JSON.parse(email) || "" : "",
        mobile: mobile ? String(JSON.parse(mobile) || "") : "",
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
    <div className="flex-1 py-4 px-5 dark:bg-zinc-700 bg-gray-200 h-full overflow-auto">
      <div className="p-5 border border-gray-300 flex flex-col mb-5 rounded-md bg-white">
        <div className="flex items-center justify-between py-5">
          <h1 className="pl-5 text-2xl font-roboto dark:text-amber-50 font-semibold">
            Users Profile
          </h1>

          <div className="flex items-center pr-5">
            <Button
              onClick={() => setOpenPassPanel(!openPasspanel)}
              className="btn-org bg-blue-500! py-2! px-3! rounded-md! text-white! capitalize!"
            >
              Change Password
            </Button>
          </div>
        </div>

        <div className="flex flex-col ">
          <div className="bg-white p-5">
            <div className="w-32 h-32 relative">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 relative flex items-center justify-center bg-gray-200">
                {uploading ? (
                  <CircularProgress color="inherit" />
                ) : avatar ? (
                  <img
                    src={avatar || "/user-image.png"}
                    alt="user"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="bg-gray-700 rounded-full w-full h-full flex items-center justify-center">
                    <span className="text-2xl font-semibold text-white">
                      {(name[0] || "").toUpperCase()}
                    </span>
                  </div>
                )}

                {islogin && (
                  <>
                    <div className="overlay hover:opacity-100 opacity-0 transition-all duration-500 ease-in-out w-full h-full absolute top-0 left-0 z-50 bg-gray-600/50 flex items-center justify-center cursor-pointer">
                      <CloudUploadIcon className="text-white text-sm" />
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={OnChangeFile}
                        name="avatar"
                      />
                    </div>
                  </>
                )}
              </div>

              {avatar && (
                <button
                  type="button"
                  title="Remove photo"
                  onClick={handleRemovePhoto}
                  className=" absolute top-2 left-25 rounded-full w-5 h-5 min-w-5 bg-red-500 flex items-center justify-center"
                >
                  <IoMdClose className="text-sm text-white cursor-pointer" />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="mt-5">
              <div className="flex items-center gap-5 w-full">
                <div className="w-1/2">
                  <input
                    name="name"
                    value={formFields.name}
                    onChange={handleChange}
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div
                  className="
                      w-1/2"
                >
                  <input
                    name="email"
                    value={formFields.email}
                    onChange={handleChange}
                    disabled={true}
                    label="Email"
                    placeholder="email"
                    size="small"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center mt-5">
                <div className="w-1/2">
                  <PhoneInput
                    defaultCountry="in"
                    value={String(formFields.mobile || "")}
                    onChange={(phone) =>
                      setFormFields((prev) => ({ ...prev, mobile: phone }))
                    }
                    className="w-full"
              inputClassName="!bg-gray-50 !border !border-gray-300 !text-gray-900 !text-sm !rounded-r-lg !focus:ring-blue-500 !focus:border-blue-500 !block !w-full !py-5.5 dark:!bg-gray-700 dark:!border-gray-600 dark:!placeholder-gray-400 dark:!text-white dark:!focus:ring-blue-500 dark:!focus:border-blue-500 !mt-1.5"
                  />
                </div>
              </div>
              <br />

              <div
                onClick={() =>
                  handleClickOpen(AddAddress, { title: "Add Address" })
                }
                className="flex items-center justify-center rounded-md p-5 border border-dashed border-gray-500 bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
              >
                <span className="font-semibold font-mono">Add Address</span>
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
        </div>
      </div>
      <Collapse isOpened={openPasspanel}>
        <div className="bg-white p-5 border border-gray-300 rounded-md mt-5">
          <h2 className="pb-3 text-xl font-roboto font-semibold">
            Change Password
          </h2>

          <hr className="text-gray-500" />

          <form onSubmit={handlePassSubmit} className="mt-5">
            <div className="flex items-center gap-5 w-full">
              <div className="w-1/2">
                <input
                 type="password"
                  name="newPassword"
                  value={changePass.newPassword}
                  onChange={handleChange2}
                  placeholder="New Password"
                  
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div
                className="
                      w-1/2"
              >
                <input
                type="password"
                  name="confirmPassword"
                  value={changePass.confirmPassword}
                  onChange={handleChange2}
                  placeholder="Confirm Password"
                  
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      <FullDialog />
    </div>
  );
};
