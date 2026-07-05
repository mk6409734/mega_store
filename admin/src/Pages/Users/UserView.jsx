import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export const UserView = ({ user }) => {
  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Paper
        elevation={0}
        className="dark:bg-zinc-800! p-6 rounded-xl border border-gray-200 dark:border-zinc-700"
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <Avatar
              src={user?.avatar || "/avatar.jpg"}
              sx={{
                width: 150,
                height: 150,
                border: "4px solid #fff",
                boxShadow: 3,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography
              variant="h4"
              gutterBottom
              className="dark:text-amber-50 font-bold"
            >
              {user?.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className="dark:text-gray-400 mb-4"
            >
              {user?.role} • {user?.status}
            </Typography>

            <Box
              sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Email Address
                </span>
                <span className="text-lg dark:text-gray-200">
                  {user?.email}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Phone Number
                </span>
                <span className="text-lg dark:text-gray-200">
                  {user?.mobile || "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  User ID
                </span>
                <span className="text-sm font-mono dark:text-gray-400">
                  {user?._id}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Last Login
                </span>
                <span className="text-sm dark:text-gray-400">
                  {user?.last_login_date
                    ? new Date(user.last_login_date).toLocaleString()
                    : "Never"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Account Created
                </span>
                <span className="text-sm dark:text-gray-400">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleString()
                    : "Unknown"}
                </span>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
