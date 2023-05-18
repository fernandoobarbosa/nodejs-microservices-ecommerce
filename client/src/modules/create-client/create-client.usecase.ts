import { prismaClient } from "../../infra/database/prismaClient";

type CreateClientRequest = {
  name: string;
  password: string;
  email: string;
  phone: string;
};

export class CreateClientUseCase {
  constructor() {}

  async execute(data: CreateClientRequest) {
    const client = await prismaClient.client.findFirst({
      where: {
        email: data.email,
      },
    });

    if (client) {
      throw new Error("Client already exists");
    }

    const createdClient = await prismaClient.client.create({
      data: {
        ...data,
      },
    });

    return createdClient;
  }
}
