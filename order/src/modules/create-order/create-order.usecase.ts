import { prismaClient } from "../../infra/database/prismaClient";

type CreateOrderRequest = {
  clientId: string;
  items: [
    {
      productId: string;
      quantity: number;
    }
  ];
};

export class CreateOrderUseCase {
  constructor() {}

  async execute(data: CreateOrderRequest) {
    const order = await prismaClient.order.create({
      data: {
        clientId: data.clientId,
        status: "AGUARDANDO_PAGAMENTO",
        OrderItems: {
          createMany: {
            data: data.items,
          },
        },
      },
    });

    //TODO: checagem no estoque
    //Requisição para API de produtos e checar estoque
    //axios

    return order;
  }
}
