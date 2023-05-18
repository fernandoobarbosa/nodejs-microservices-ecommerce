import express from "express";
import './infra/providers/kafka/consumers'
import {router} from '../src/infra/routes';

const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(router)

app.listen(PORT, () => {
  console.log(`Client server listening on port ${PORT}`);
});
