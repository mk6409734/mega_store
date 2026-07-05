import React, { useState, useEffect } from "react";
import { adminStore } from "../../Store/Store";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { ProgressBar } from "../../Components/ProgressBar/ProgressBar";

export const UserEditForm = ({ user, onSuccess }) => {
  const { AdminUpdateUser, handleClose, loading } = adminStore();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    role: user?.role || "User",
    status: user?.status || "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await AdminUpdateUser(user._id, formData);
    if (res?.success) {
      if (onSuccess) onSuccess();
      handleClose();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <h2 className="text-xl font-semibold mb-2">Edit User: {user?.name}</h2>

      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Mobile"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        select
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value="User">User</MenuItem>
        <MenuItem value="Admin">Admin</MenuItem>
      </TextField>

      <TextField
        select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="InActive">InActive</MenuItem>
        <MenuItem value="Suspended">Suspended</MenuItem>
      </TextField>

      <Button
        variant="contained"
        type="submit"
        disabled={loading}
        sx={{ mt: 2, py: 1.5 }}
      >
        {loading ? "Updating..." : "Update User"}
      </Button>
    </Box>
  );
};
