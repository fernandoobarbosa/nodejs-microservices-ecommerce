import { kafkaConsumer } from "../kafka.consumer";
import { prismaClient } from "../../../database/prismaClient";

type ProductConsumer = {
  code: string;
  id: string;
};

export async function createProductConsumer() {
  const consumer = await kafkaConsumer("PRODUCT_CREATED");
  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value?.toString();
      const product = JSON.parse(messageToString) as ProductConsumer;
      console.log("CAIU AQUI", product);

      await prismaClient.product.create({
        data: {
          externalId: product.id,
          code: product.code,
        },
      });
    },
  });
}

createProductConsumer();
