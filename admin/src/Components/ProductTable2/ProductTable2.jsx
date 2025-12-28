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
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Link } from "react-router-dom";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { MdOutlineModeEdit } from "react-icons/md";
import Button from "@mui/material/Button";
import { FaRegEye } from "react-icons/fa6";
import { LuTrash2 } from "react-icons/lu";
import FilterList from "../ProductTable/FilterList";
import { SearchBox } from "../SearchBox/SearchBox";

function createData(
  id,
  product,
  category,
  subcategory,
  price,
  sale,

  action
) {
  return {
    id,
    product,
    category,
    subcategory,
    price,
    sale,

    action,
  };
}

const rows = [
  createData(
    1,
    {
      title: "Lorem ipsum dolor sit amet.",
      brand: "samsung",
      image: "./product1.png",
    },
    "Electronics",
    "Women",
    { old: "$58.00", new: "$48.00" },
    { Total: 234, type: "sale", typebar: "success", value: 40 }
  ),
  createData(
    1,
    {
      title: "Lorem ipsum dolor sit amet.",
      brand: "samsung",
      image: "./product1.png",
    },
    "Electronics",
    "Women",
    { old: "$58.00", new: "$48.00" },
    { Total: 234, type: "sale", typebar: "success", value: 40 }
  ),
  createData(
    1,
    {
      title: "Lorem ipsum dolor sit amet.",
      brand: "samsung",
      image: "./product1.png",
    },
    "Electronics",
    "Women",
    { old: "$58.00", new: "$48.00" },
    { Total: 234, type: "sale", typebar: "success", value: 40 }
  ),
  createData(
    1,
    {
      title: "Lorem ipsum dolor sit amet.",
      brand: "samsung",
      image: "./product1.png",
    },
    "Electronics",
    "Women",
    { old: "$58.00", new: "$48.00" },
    { Total: 234, type: "sale", typebar: "success", value: 40 }
  ),
  createData(
    1,
    {
      title: "Lorem ipsum dolor sit amet.",
      brand: "samsung",
      image: "./product1.png",
    },
    "Electronics",
    "Women",
    { old: "$58.00", new: "$48.00" },
    { Total: 234, type: "sale", typebar: "success", value: 40 }
  ),
  createData(
    1,
    {
      title: "Lorem ipsum dolor sit amet.",
      brand: "samsung",
      image: "./product1.png",
    },
    "Electronics",
    "Women",
    { old: "$58.00", new: "$48.00" },
    { Total: 234, type: "sale", typebar: "success", value: 40 }
  ),
  createData(
    1,
    {
      title: "Lorem ipsum dolor sit amet.",
      brand: "samsung",
      image: "./product1.png",
    },
    "Electronics",
    "Women",
    { old: "$58.00", new: "$48.00" },
    { Total: 234, type: "sale", typebar: "success", value: 40 }
  ),
];

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
    id: "product",
    numeric: false,
    disablePadding: false,
    label: "Product",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: true,
    label: "Category",
  },
  {
    id: "subcategory",
    numeric: true,
    disablePadding: false,
    label: "Sub Category",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "sale",
    numeric: true,
    disablePadding: false,
    label: "Sales",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
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
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
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
              theme.palette.action.activatedOpacity
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

export default function ProductTable2() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
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
        selected.slice(selectedIndex + 1)
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, mt: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />

        <div className="flex justify-between items-center">
          <div>
            <h1 className="pl-4">Category By</h1>
            <FilterList />{" "}
          </div>

          <div className="pr-5">
            <SearchBox />
          </div>
          {/* <div
            className="flex gap-3 items-center pr-5
            "
          >
            <Button className="!bg-green-500 !text-white !px-3 !py-2">
              Export
            </Button>
            <Button className="!bg-blue-500 !text-white !px-3 !py-2">
              Add Product
            </Button>
          </div> */}
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
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{ width: 300 }}
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-md  overflow-hidden flex justify-center items-center  w-15 min-w-15 group">
                          <Link to="/product/43434">
                            <img
                              className="w-full group-hover:scale-105"
                              src={row.product?.image}
                              alt="fdd"
                            />
                          </Link>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">
                            {row.product?.title}
                          </p>
                          <span className="font-normal text-gray-400">
                            {row.product?.brand}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="left">{row.category}</TableCell>
                    <TableCell align="left">{row.subcategory}</TableCell>

                    <TableCell align="left">
                      <div
                        className="flex
                    gap-1 flex-col"
                      >
                        <span className="line-through text-gray-500 font-medium">
                          {row.price?.old}
                        </span>
                        <span className=" text-primary font-semibold">
                          {row.price?.new}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      <div className="flex flex-col items-center gap-1">
                        <p className="flex text-gray-500">
                          <span className="font-semibold text-gray-700">
                            {row.sale?.Total}
                          </span>
                          {row.sale?.type}
                        </p>
                        <ProgressBar
                          value={row.sale?.value}
                          type={row.sale?.typebar}
                        />
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      <div className="flex items-center gap-1">
                        <Tooltip title="edit" placement="top">
                          <Button className="!w-8 !h-8 bg-gray-200 !border !border-gray-300 !min-w-8 hover:!border-blue-500">
                            <MdOutlineModeEdit className="text-gray-600" />
                          </Button>
                        </Tooltip>
                        <Tooltip title="view" placement="top">
                          <Button className="!w-8 !h-8 bg-gray-200 !border !border-gray-300 !min-w-8 hover:!border-blue-500">
                            <FaRegEye className="text-gray-600" />
                          </Button>
                        </Tooltip>
                        <Tooltip title="delete" placement="top">
                          <Button className="!w-8 !h-8 bg-gray-200 !border !border-gray-300 !min-w-8 hover:!border-blue-500">
                            <LuTrash2 className="text-gray-600" />
                          </Button>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell align="left">{row.rating}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
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
  );
}
