import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import apiVersions from "./api/index.mjs";
import errorHandler from "./api/shared/errorHandler.mjs";
import AppError from "./utils/appError.mjs";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.set("trust proxy", 1);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP. Try again in 15 mins.",
  })
);

app.use(express.urlencoded({ extended: false }));

// parse requests of content-type - application/json
app.use(express.json());
app.use(cookieParser());

// Data sanitization against XSS (cross-site scripting)
app.use(xss());

app.get("/", (_, res) => {
  res.json({ message: "Welcome Reactorco." });
});

app.use("/api", apiVersions);

app.all("*", (req, _, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

app.set("port", process.env.PORT || 4000);

mongoose.connect(
  `mongodb://mongodb:27017/reactorco`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error("FAILED TO CONNECT TO MONGODB");
      console.error(err);
    } else {
      console.log("CONNECTED TO MONGODB!!");
      app.listen(4000, () =>
        console.log(
          `App listening on port 4000 in ${process.env.NODE_ENV} mode.`
        )
      );
    }
  }
);
