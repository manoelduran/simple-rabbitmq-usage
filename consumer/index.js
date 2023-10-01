const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (error, connection) => {
  if (error) {
    throw error;
  }

  connection.createChannel((error, channel) => {
    if (error) {
      throw error;
    }

    const queue = "my_queue";
    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(
      `[*] Waiting for messages in ${queue}. For an exit, press CTRL+ C`
    );
    channel.consume(
      queue,
      (msg) => {
        console.log(`[x] Received: ${msg.content.toString()}`);
      },
      {
        noAck: true,
      }
    );
  });
});
