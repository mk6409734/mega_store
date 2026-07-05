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
import { FaRegEye } from "react-icons/fa6";
import { LuTrash2 } from "react-icons/lu";
import FilterList from "../ProductTable/FilterList";
import { SearchBox } from "../SearchBox/SearchBox";
import { adminStore } from "../../Store/Store";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// ─── Helpers ────────────────────────────────────────────────────────────────

function descendingComparator(a, b, orderBy) {
  if ((b[orderBy] ?? "") < (a[orderBy] ?? "")) return -1;
  if ((b[orderBy] ?? "") > (a[orderBy] ?? "")) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: false, label: "Product" },
  { id: "catName", numeric: false, disablePadding: false, label: "Category" },
  {
    id: "SubcatName",
    numeric: false,
    disablePadding: false,
    label: "Sub Category",
  },
  { id: "price", numeric: true, disablePadding: false, label: "Price" },
  { id: "countInStock", numeric: true, disablePadding: false, label: "Stock" },
  { id: "rating", numeric: true, disablePadding: false, label: "Rating" },
  { id: "action", numeric: false, disablePadding: false, label: "Action" },
];

// ─── Table Head ─────────────────────────────────────────────────────────────

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) =>
    onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all products" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
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

// ─── Toolbar ────────────────────────────────────────────────────────────────

function EnhancedTableToolbar({ numSelected, onDeleteSelected }) {
  return (
    <Toolbar
      sx={[
        { pl: { sm: 2 }, pr: { xs: 1, sm: 1 } },
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
        <Tooltip title="Delete selected">
          <IconButton onClick={onDeleteSelected}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDeleteSelected: PropTypes.func.isRequired,
};

// ─── Confirm Delete Dialog ───────────────────────────────────────────────────

function ConfirmDeleteDialog({ open, onConfirm, onCancel, count }) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{" "}
          {count > 1 ? `these ${count} products` : "this product"}? This action
          cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ProductTable2() {
  const { products, loading, GetAllProducts, DeleteProduct, GetCategory } =
    adminStore();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState(""); // catName string
  const [rootCategories, setRootCategories] = React.useState([]);

  // Confirm dialog state
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = React.useState([]);

  // Fetch products + categories on mount
  React.useEffect(() => {
    GetAllProducts(1, 100);
    GetCategory().then((res) => {
      if (res?.success && Array.isArray(res.data)) {
        setRootCategories(res.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filteredRows = React.useMemo(() => {
    let rows = products;

    // 1. Category filter (matches any level)
    if (categoryFilter) {
      rows = rows.filter(
        (p) =>
          p.catName === categoryFilter ||
          p.SubcatName === categoryFilter ||
          p.ThirdcatName === categoryFilter,
      );
    }

    // 2. Text search
    const q = search.toLowerCase();
    if (q) {
      rows = rows.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.catName?.toLowerCase().includes(q) ||
          p.SubcatName?.toLowerCase().includes(q),
      );
    }

    return rows;
  }, [products, search, categoryFilter]);

  // ── Sorting + Pagination ───────────────────────────────────────────────────
  const visibleRows = React.useMemo(
    () =>
      [...filteredRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredRows, order, orderBy, page, rowsPerPage],
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(visibleRows.map((n) => n._id));
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (_, id) => {
    const idx = selected.indexOf(id);
    let newSelected = [];
    if (idx === -1) newSelected = [...selected, id];
    else newSelected = selected.filter((s) => s !== id);
    setSelected(newSelected);
  };

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Reset page when filters change
  React.useEffect(() => {
    setPage(0);
  }, [search, categoryFilter]);

  // ── Delete logic ──────────────────────────────────────────────────────────
  const openConfirmDelete = (ids) => {
    setPendingDeleteIds(ids);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setConfirmOpen(false);
    for (const id of pendingDeleteIds) {
      await DeleteProduct(id);
    }
    setSelected((prev) => prev.filter((id) => !pendingDeleteIds.includes(id)));
    setPendingDeleteIds([]);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setPendingDeleteIds([]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, mt: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDeleteSelected={() => openConfirmDelete(selected)}
        />

        {/* Filter / Search bar */}
        <div className="flex justify-between items-center px-4 py-2">
          <div>
            <h1 className="pl-0 font-medium text-gray-600 text-sm mb-0.5">
              Filter by Category
            </h1>
            <FilterList
              categories={rootCategories}
              value={categoryFilter}
              onChange={(val) => setCategoryFilter(val)}
            />
          </div>
          <div className="pr-2 w-64">
            <SearchBox
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search by name, brand…"
            />
          </div>
        </div>

        <TableContainer>
          {loading && products.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <CircularProgress />
            </div>
          ) : (
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
                rowCount={visibleRows.length}
              />
              <TableBody>
                {visibleRows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      align="center"
                      sx={{ py: 6, color: "text.secondary" }}
                    >
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleRows.map((row, index) => {
                    const isItemSelected = selected.includes(row._id);
                    const labelId = `product-checkbox-${index}`;
                    const firstImage = row.images?.[0] || "";

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onChange={(e) => handleRowClick(e, row._id)}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>

                        {/* Product info */}
                        <TableCell
                          sx={{ minWidth: 240 }}
                          component="th"
                          id={labelId}
                          scope="row"
                        >
                          <div className="flex items-center gap-3">
                            <div className="rounded-md overflow-hidden flex justify-center items-center w-14 min-w-14 h-14 bg-gray-100 group">
                              <Link to={`/product/${row._id}`}>
                                {firstImage ? (
                                  <img
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    src={firstImage}
                                    alt={row.name}
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                    }}
                                  />
                                ) : (
                                  <span className="text-xs text-gray-400">
                                    No img
                                  </span>
                                )}
                              </Link>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700 text-sm leading-tight line-clamp-2">
                                {row.name}
                              </p>
                              <span className="font-normal text-gray-400 text-xs">
                                {row.brand}
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        {/* Category */}
                        <TableCell align="left">
                          <span className="text-sm text-gray-600">
                            {row.catName || "—"}
                          </span>
                        </TableCell>

                        {/* Sub Category */}
                        <TableCell align="left">
                          <span className="text-sm text-gray-600">
                            {row.SubcatName || "—"}
                          </span>
                        </TableCell>

                        {/* Price */}
                        <TableCell align="left">
                          <div className="flex gap-1 flex-col">
                            {row.oldPrice ? (
                              <span className="line-through text-gray-400 text-xs">
                                ₹{row.oldPrice}
                              </span>
                            ) : null}
                            <span className="text-blue-600 font-semibold text-sm">
                              ₹{row.price}
                            </span>
                          </div>
                        </TableCell>

                        {/* Stock */}
                        <TableCell align="left">
                          <span
                            className={`text-sm font-semibold ${
                              row.countInStock > 0
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            {row.countInStock > 0
                              ? row.countInStock
                              : "Out of stock"}
                          </span>
                        </TableCell>

                        {/* Rating */}
                        <TableCell align="left">
                          <span className="text-sm text-yellow-500 font-semibold">
                            ⭐ {row.rating ?? 0}
                          </span>
                        </TableCell>

                        {/* Actions */}
                        <TableCell
                          align="left"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-1">
                            <Tooltip title="Edit" placement="top">
                              <Button
                                component={Link}
                                to={`/product/edit/${row._id}`}
                                className="w-[34px]! h-[34px]! min-w-[34px]! rounded-full! bg-green-50! text-green-600! hover:bg-green-100!"
                              >
                                <MdOutlineModeEdit  />
                              </Button>
                            </Tooltip>
                            <Tooltip title="View" placement="top">
                              <Button
                                component={Link}
                                to={`/product/${row._id}`}
                                className="w-[34px]! h-[34px]! min-w-[34px]! rounded-full! bg-blue-50! text-blue-600! hover:bg-blue-100!"
                              >
                                <FaRegEye  />
                              </Button>
                            </Tooltip>
                            <Tooltip title="Delete" placement="top">
                              <Button
                                className="w-[34px]! h-[34px]! min-w-[34px]! rounded-full! bg-red-50! text-red-600! hover:bg-red-100!"
                                onClick={() => openConfirmDelete([row._id])}
                              >
                                <LuTrash2  />
                              </Button>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={8} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <FormControlLabel
        control={
          <Switch
            checked={dense}
            onChange={(e) => setDense(e.target.checked)}
          />
        }
        label="Dense padding"
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDeleteDialog
        open={confirmOpen}
        count={pendingDeleteIds.length}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Box>
  );
}
