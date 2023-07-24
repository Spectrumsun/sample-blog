import express, { Express, Request, Response } from 'express';
import routes from './routes';
import cors from 'cors';
import config from './config';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
//import swaggerDocument from "./swagger.json";
const swaggerDocument = require('../swagger.json');
const app: Express = express();
const port = config.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Api use /api/v1'
  });
});

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Blog API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application for a blog made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Sunday Taiwo",
        url: "",
        email: "taiwo.sunday@outlook.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js", "./routes/*.ts", ],
};

const specs = swaggerJsdoc(options);


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use("/api/v1", routes);

const running = console.log(`Server is running at http://localhost:${port}`)

app.listen(port, () => running);