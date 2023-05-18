import { kafkaConsumer } from "../kafka.consumer";
import { prismaClient } from "../../../database/prismaClient";

type ClientConsumer = {
  email: string;
  id: string;
};

export async function createClientConsumer() {
  console.log("CLIENT CONSUMER");
  const consumer = await kafkaConsumer("CLIENT_CREATED");
  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value?.toString();
      const client = JSON.parse(messageToString) as ClientConsumer;

      await prismaClient.client.create({
        data: {
          email: client.email,
          externalId: client.id,
        },
      });
    },
  });
}

createClientConsumer();
