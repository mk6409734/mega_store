import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";

import { visuallyHidden } from "@mui/utils";
import { Link } from "react-router-dom";

import { MdOutlineModeEdit } from "react-icons/md";
import Button from "@mui/material/Button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { LuTrash2 } from "react-icons/lu";
import toast from "react-hot-toast";

import { ProgressBar } from "../../Components/ProgressBar/ProgressBar";
import { SearchBox } from "../../Components/SearchBox/SearchBox";
import { adminStore } from "../../Store/Store";
import { IoIosSearch } from "react-icons/io";
import { UserEditForm } from "./UserEditForm";
import { UserView } from "./UserView";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "avatar",
    numeric: false,
    disablePadding: false,
    label: "User Image",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "User Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "User Email",
  },
  {
    id: "mobile",
    numeric: false,
    disablePadding: false,
    label: "User Phone",
  },
  {
    id: "role",
    numeric: false,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
  {
    id: "passwords",
    numeric: false,
    disablePadding: false,
    label: "Password",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          padding="checkbox"
          className="dark:text-amber-50! text-gray-700!"
        >
          <Checkbox
            className="dark:text-amber-50! text-gray-700!"
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all users",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className="dark:text-amber-50! text-gray-700!"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        },
      ]}
    >
      {numSelected > 0 && (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Users() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState("");

  const [users, setUsers] = React.useState([]);
  const [currentUserRole, setCurrentUserRole] = React.useState(null);
  const [visiblePasswords, setVisiblePasswords] = React.useState({});
  const { GetAllUsers, loading, handleClickOpen, DeleteUser } = adminStore();

  const fetchUsers = async () => {
    const res = await GetAllUsers();
    if (res?.success) {
      const usersList = res.data || [];
      setUsers(usersList);
      try {
        const myEmailStr = localStorage.getItem("email");
        if (myEmailStr) {
          const myEmail = JSON.parse(myEmailStr);
          const me = usersList.find((u) => u.email === myEmail);
          if (me) {
            setCurrentUserRole(me.role);
          }
        }
      } catch (err) {
        console.error("Error parsing email", err);
      }
    }
  };

  const handleTogglePassword = (e, userId) => {
    e.stopPropagation();
    if (currentUserRole === "Admin") {
      setVisiblePasswords((prev) => ({
        ...prev,
        [userId]: !prev[userId],
      }));
    } else {
      toast.error("Only Admin can view passwords!");
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredUsers.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const onViewUser = (user) => {
    handleClickOpen(UserView, { user, title: "User Details" });
  };

  const onEditUser = (user) => {
    handleClickOpen(UserEditForm, {
      user,
      title: "Edit User",
      onSuccess: fetchUsers,
    });
  };

  const onDeleteUser = async (user) => {
    if (window.confirm(`Are you sure you want to delete user ${user.name}?`)) {
      const res = await DeleteUser(user._id);
      if (res?.success) {
        fetchUsers();
      }
    }
  };

  const filteredUsers = React.useMemo(() => {
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.mobile?.toString().includes(searchQuery),
    );
  }, [users, searchQuery]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...filteredUsers]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredUsers],
  );

  return (
    <div className="flex-1 py-4 px-5 dark:bg-zinc-700 bg-gray-100 h-full overflow-auto">
      <Box sx={{ width: "100%" }}>
        <Paper
          className="dark:bg-zinc-700! bg-white! dark:border! border-zinc-600!"
          sx={{ width: "100%", mb: 2, mt: 2 }}
        >
          <EnhancedTableToolbar numSelected={selected.length} />

          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="pl-5 text-2xl font-roboto dark:text-amber-50 font-semibold">
                Users List
              </h1>
            </div>

            <div className="pr-5">
              <div className="w-full h-auto bg-gray-100 relative overflow-hidden">
                <IoIosSearch className="absolute top-3 left-3 z-50 pointer-events-none" />
                <input
                  type="text"
                  className="w-full h-10 border border-gray-500 bg-gray-100 p-2 pl-8 focus:outline-none focus:border-gray-600 rounded-md"
                  placeholder="Search here..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={filteredUsers.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = selected.includes(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                      className="dark:hover:bg-zinc-600 hover:bg-gray-50"
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          className="dark:text-amber-50! text-gray-700!"
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{ width: 300, pl: 5 }}
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <div className="rounded-md overflow-hidden flex justify-start items-center ml-2 p-1">
                          <img
                            className="w-12 h-12 object-cover rounded-full border border-gray-300 shadow-sm"
                            src={row.avatar || "/avatar.jpg"}
                            alt={row.name}
                            onError={(e) => {
                              e.target.src = "/avatar.jpg";
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell
                        align="left"
                        className="dark:text-amber-50! text-gray-700!"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="dark:text-amber-50! text-gray-700!"
                      >
                        {row.email}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="dark:text-amber-50! text-gray-700!"
                      >
                        {row.mobile || "N/A"}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="dark:text-amber-50! text-gray-700!"
                      >
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${row.role === "Admin" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}
                        >
                          {row.role}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewUser(row);
                            }}
                            className="w-[34px]! h-[34px]! min-w-[34px]! rounded-full! bg-blue-50! text-blue-600! hover:bg-blue-100!"
                          >
                            <FaRegEye />
                          </Button>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditUser(row);
                            }}
                            className="w-[34px]! h-[34px]! min-w-[34px]! rounded-full! bg-green-50! text-green-600! hover:bg-green-100!"
                          >
                            <MdOutlineModeEdit />
                          </Button>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteUser(row);
                            }}
                            className="w-[34px]! h-[34px]! min-w-[34px]! rounded-full! bg-red-50! text-red-600! hover:bg-red-100!"
                          >
                            <LuTrash2 />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <div className="flex items-center gap-2 dark:text-amber-50! text-gray-700!">
                          <span className="min-w-[60px]">
                            {!row.password
                              ? "N/A"
                              : visiblePasswords[row._id]
                                ? row.password
                                : "********"}
                          </span>
                          {row.password && (
                            <Button
                              onClick={(e) => handleTogglePassword(e, row._id)}
                              className="w-[30px]! h-[30px]! min-w-[30px]! rounded-full! bg-gray-100! text-gray-600! hover:bg-gray-200! dark:bg-zinc-600! dark:text-gray-300!"
                            >
                              {visiblePasswords[row._id] ? (
                                <FaRegEyeSlash />
                              ) : (
                                <FaRegEye />
                              )}
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={7} />
                  </TableRow>
                )}
                {!loading && filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      align="center"
                      className="dark:text-amber-50 py-10"
                    >
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </div>
  );
}
