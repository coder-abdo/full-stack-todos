import express, { json, urlencoded } from "express";
import cors from "cors";
import { config } from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { main } from "./database/connect";
import routes from "./routes/routes";
import { errorMiddleWare } from "./middlewares/errorMiddleware";
config();
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser());
main()
  .then(() => console.log("connected to the database"))
  .catch((err) => console.error(err));

app.use("/", routes);
app.use(errorMiddleWare);
app.listen(port, () => console.log(`app is running at localhost:${port}`));
