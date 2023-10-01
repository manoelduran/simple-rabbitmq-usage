import pika
import time
from pika import BlockingConnection, ConnectionParameters

connection: BlockingConnection = pika.BlockingConnection(
    ConnectionParameters('localhost'))
channel = connection.channel()
queue: str = 'my_queue'
channel.queue_declare(queue=queue, passive=False, durable=False,
                      exclusive=False, auto_delete=False, arguments=None)

for i in range(1, 11):
    message: str = f'Message {i}'
    channel.basic_publish(exchange='',
                          routing_key='my_queue',
                          body=message)
    print(f" [x] Your message was sent '{message}'")
    time.sleep(2)

connection.close()
