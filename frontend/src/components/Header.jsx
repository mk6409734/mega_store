import React,{ useContext } from "react";
import { Link } from "react-router-dom";
import { Search } from "./Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosGitCompare } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import Tooltip from "@mui/material/Tooltip";
import { Navbar } from "./Navbar";
import { MyContext } from "../App";
import { UserAccountDetails } from "./UserAccount";
import { FrontStore } from "../Store/Store";

export const Header = () => {
  const { islogin } = FrontStore();
  const context = useContext(MyContext);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  return (
    <header className="bg-white">
      <div className="top-strip py-2">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%]">
              <p className="text-sm font-normal">
                Get up to 50% off new season styles, limited time only
              </p>
            </div>

            <div className="col2 flex items-center justify-end">
              <ul className="flex items-center gap-3">
                <li>
                  <Link to="/" className="link transition">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/order_tracking" className="link transition">
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header py-4 border-b border-gray-300">
        <div className="container mx-auto flex items-center justify-between">
          <div className="">
            <Link to={"/"}>
              <img src="./logo.jpg" alt="logo" />
            </Link>
          </div>
          <div className="">
            <Search />
          </div>
          <div className=" flex items-center gap-2">
            {islogin === false ? (
              <div className="">
                <Link className="link" to="/login">
                  Login
                </Link>{" "}
                /{" "}
                <Link className="link" to="/register">
                  Register
                </Link>
              </div>
            ) : (
              <UserAccountDetails />
            )}

            <div className="flex items-center gap-2">
              <Tooltip title="Compare">
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={4} color="secondary">
                    <IoIosGitCompare />
                  </StyledBadge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Favorate">
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={4} color="secondary">
                    <IoMdHeartEmpty />
                  </StyledBadge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Cart">
                <IconButton
                  aria-label="cart"
                  onClick={() => context.setOpenCart(true)}
                >
                  <StyledBadge badgeContent={4} color="secondary">
                    <AiOutlineShoppingCart />
                  </StyledBadge>
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      <Navbar />
    </header>
  );
};
