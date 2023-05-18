import { Request, Response } from "express";
import { CreateOrderUseCase } from "./create-order.usecase";

export class CreateOrderController {
  constructor() {}

  async handle(request: Request, response: Response) {
    const useCase = new CreateOrderUseCase();
    try {
      const result = await useCase.execute(request.body);
      return response.status(201).json(result);
    } catch (err) {
      console.error(err);
      return response.status(400).json(err);
    }
  }
}
