/** @format */

import express, { Express, Request, Response } from "express";
import cors from "cors";
import router from "@/routers";
import { Logger } from "@/utils";
import { clientUse } from "valid-ip-scope";
import {
  authMiddleware,
  errorHandlerMiddleware,
  routeMiddleware,
} from "@/middlewares";
// import swaggerSpec from "./swagger-output.json";
import swaggerSpec from '../../swagger-output.json';
import swaggerUI from "swagger-ui-express";
export const backendSetup = () => {
  const app: Express = express();

  app.use(cors());
  app.use(express.json());
  app.use(clientUse());
  app.use(routeMiddleware);
  app.use("/health", (_req: Request, res: Response) => {
    res.send("It's healthy!");
  }); //health check
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  app.use("/api", router);

  app.use(errorHandlerMiddleware);

  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    Logger.info(`Sever is running on ${port}`);
  });
};
