/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';
const cors = require('cors');
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import yamljs from 'yamljs';

import BaseRouter from '@src/routes';
import Paths from '@src/common/Paths';
import EnvVars from '@src/common/EnvVars';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/classes';
import { NodeEnvs } from '@src/common/misc';

// **** Variables **** //
const app = express();

// **** Setup **** //
// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

app.use(cors({
  origin: 'http://localhost:5173', // Votre URL de l'application React
}));

// Ajouter les APIs, doit être après les middlewares
app.use(Paths.Base, BaseRouter); // Paths.Base est '/api'

// Charger le fichier YAML
const swaggerDocument = yamljs.load(path.join(__dirname, './doc/swagger.yaml'));

// Ajouter Swagger comme middleware
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Serve Swagger on the root path '/'

// Gestion des erreurs
app.use((
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});

// **** Front-End Content **** //
// Set static directory (js and css).
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// **** Export default **** //
export default app;
