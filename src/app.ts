import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./modules/user/user.route";
import errorHandler from "./middlewares/error.middleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use(errorHandler);

export default app;
