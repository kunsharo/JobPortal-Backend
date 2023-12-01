import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/logging";
import dotenv from "dotenv";
import router from "./routes/index_router";

dotenv.config();

const app: Application = express();
const port: Number = Number(process.env.SERVER_PORT) || 8081;

/** Connect to db */
mongoose
  .connect(config.mongo.url)
  .then(() => {
    Logging.info("Connected to db");

    StartServer();
  })
  .catch((err) => {
    Logging.error(`Cannot connect : ${err}`);
  });

/** Starts the server only when DB connects */
const StartServer = () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api/v1', router);

    app.get('/', async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).json({ message: 'Hello There! We are online' });
    })

    app.use((req, res) => {
        const error = new Error('not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message })
    })

    app.listen(port, () => {
        Logging.info(`Server running at http://localhost:${port}`)
    })
}
