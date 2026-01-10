const amqp = require("amqplib");

const RABBIT_URL = "amqp://rabbitmq";
const QUEUE = "email_queue";

async function publishEmailEvent(payload) {
  const connection = await amqp.connect(RABBIT_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE, { durable: true });

  channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(payload)), {
    persistent: true,
  });

  await channel.close();
  await connection.close();
}

module.exports = { publishEmailEvent };
