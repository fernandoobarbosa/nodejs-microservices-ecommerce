import { prismaClient } from "../../infra/database/prismaClient";
import { KafkaSendMessage } from "../../infra/providers/kafka/producer";

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

    console.log(client);

    if (client) {
      throw new Error("Client already exists");
    }

    const createdClient = await prismaClient.client.create({
      data: {
        ...data,
      },
    });

    const kafkaProducer = new KafkaSendMessage();
    const { id, email } = createdClient;
    await kafkaProducer.execute("CLIENT_CREATED", { id, email });

    return createdClient;
  }
}
