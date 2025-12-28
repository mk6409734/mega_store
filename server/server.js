import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import { connectDb } from "./Config/Connectdb.js";
import { userRouter } from "./Route/User.js";
import { categoryRouter } from "./Route/Category.js";
import { ProductRouter } from "./Route/Product.js";
import { CartRouter } from "./Route/Cart.js";
import { MyListRouter } from "./Route/MyList.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
app.use(
	cors({
		origin: '*',
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/api/mylist", MyListRouter);


connectDb().then(() => {
  app.listen(PORT, () => console.log(`✅ server is running in ${PORT}🚀`));
});
