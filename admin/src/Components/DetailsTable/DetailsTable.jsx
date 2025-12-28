import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Chip from "@mui/material/Chip";
import { SearchBox } from "../SearchBox/SearchBox";

function createData(
  OrderId,
  PaymentId,
  Products,
  Name,
  PhoneNumber,
  address,
  pincode,
  totalamount,
  email,
  userid,
  orderstatus,
  date
) {
  return {
    OrderId,
    PaymentId,
    Products,
    Name,
    PhoneNumber,
    address,
    pincode,
    totalamount,
    email,
    userid,
    orderstatus,
    date,
    history: [
      {
        productId: "fjifjeif343i4j3iji",
        productTitle: "Men Opaque Casual Shirt",
        Image:
          "https://serviceapi.spicezgold.com/download/1742462909158_gdgd2.jpg",
        Quantity: 3,
        price: 1300,
        Subtotal: 1300,
      },
    ],
  };
}

function getStatusChipProps(status) {
  const normalized = String(status || "").toLowerCase();
  switch (normalized) {
    case "pending":
    case "awaiting payment":
      return { label: "Pending", color: "warning" };
    case "processing":
    case "in progress":
    case "shipped":
      return { label: "Processing", color: "info" };
    case "delivered":
    case "success":
    case "completed":
      return { label: "Delivered", color: "success" };
    case "cancelled":
    case "canceled":
    case "failed":
      return { label: "Cancelled", color: "error" };
    case "returned":
    case "refunded":
      return { label: "Returned", color: "secondary" };
    default:
      return { label: status || "Unknown", color: "default" };
  }
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        className="!whitespace-nowrap"
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell className="!text-primary" component="th" scope="row">
          {row.OrderId}
        </TableCell>
        <TableCell className="!text-primary" align="right">
          {row.PaymentId}
        </TableCell>
        <TableCell align="right">{row.Products}</TableCell>
        <TableCell align="right">{row.Name}</TableCell>
        <TableCell align="right">{row.PhoneNumber}</TableCell>
        <TableCell align="right">{row.address}</TableCell>
        <TableCell align="right">{row.pincode}</TableCell>
        <TableCell align="right">{row.totalamount}</TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.userid}</TableCell>
        <TableCell align="right">
          {(() => {
            const { label, color } = getStatusChipProps(row.orderstatus);
            return (
              <Chip
                label={label}
                color={color}
                size="small"
                variant="filled"
                sx={{
                  borderRadius: "9999px",
                  textTransform: "capitalize",
                  fontWeight: 400,
                  padding: "2px",
                  "& .MuiChip-label": { px: 1 },
                }}
              />
            );
          })()}
        </TableCell>
        <TableCell align="right">{row.date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: "3.5%" }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow className="!whitespace-nowrap">
                    <TableCell>Product ID</TableCell>
                    <TableCell>Product Title</TableCell>
                    <TableCell align="right">Image</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">SubTotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="!whitespace-nowrap">
                  {row.history.map(
                    ({
                      productId,
                      productTitle,
                      Image,
                      Quantity,
                      price,
                      Subtotal,
                    }) => (
                      <TableRow key={productId}>
                        <TableCell component="th" scope="row">
                          {productId}
                        </TableCell>
                        <TableCell>{productTitle}</TableCell>
                        <TableCell
                          align="right"
                          className="!w-8 !h-8 !rounded-md"
                        >
                          <img
                            src={Image}
                            className="w-full object-contain rounded-md"
                          />
                        </TableCell>
                        <TableCell align="right">{Quantity}</TableCell>
                        <TableCell align="right">{price}</TableCell>
                        <TableCell align="right">{Subtotal}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData(
    "fjifjeif343i4j3iji",
    "fdifi3jri3j3ur93u",
    "Click here to view",
    "Mohit Gautam",
    9311308218,
    "h no. 1097 Rithala, lal Dora Delhi",
    110085,
    5000,
    "mk945909@gmail.com",
    "dfdhf343443re",
    "Delivered",
    "24-09-2025"
  ),
];

export default function DetailsTables() {
  return (
    <TableContainer
      className="scroll"
      component={Paper}
      sx={{ width: "100%", overflowX: "auto" }}
    >
      <div className="flex items-center justify-between py-6 px-5">
        <h1 className="text-2xl font-roboto font-semibold">Orders</h1>
        <div className="w-1/3"><SearchBox/></div>
        
      </div>
      <Table
        aria-label="collapsible table"
        sx={{ minWidth: 1200, width: "100%" }}
      >
        <TableHead>
          <TableRow className="!whitespace-nowrap">
            <TableCell />
            <TableCell>Order Id</TableCell>
            <TableCell align="left">Payment id</TableCell>
            <TableCell align="left">Products</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Phone Number</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">PinCode</TableCell>
            <TableCell align="left">Total Amount</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">User Id</TableCell>
            <TableCell align="left">Order Status</TableCell>
            <TableCell align="left">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.OrderId} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
