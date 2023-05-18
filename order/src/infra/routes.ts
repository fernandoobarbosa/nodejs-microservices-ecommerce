import { Router } from "express";
import { CreateOrderController } from "../modules/create-order/create-order-controller";

const router = Router();

router.post("/orders", (req, res) => {
    new CreateOrderController().handle(req, res);
})

export {router}
