import pika
import json
from src.core.config import Config
from src.core.funcs import generate_idempotency_key

class RabbitMQPublisher:
    def __init__(self):
        self.credentials = pika.PlainCredentials(
            username=Config.RABBITMQ_USER,
            password=Config.RABBITMQ_PASSWORD
        )
        self.parameters = pika.ConnectionParameters(
            host=Config.RABBITMQ_HOST,
            port=int(Config.RABBITMQ_PORT) if Config.RABBITMQ_PORT else 5672,
            virtual_host=Config.RABBITMQ_VHOST or "/",
            credentials=self.credentials
        )
        self.connection = None
        self.channel = None
    
    def connect(self):
        try:
            if self.connection is None or self.connection.is_closed:
                self.connection = pika.BlockingConnection(self.parameters)
                self.channel = self.connection.channel()
            return True
        except Exception as e:
            return False
    
    def close(self):
        if self.connection and self.connection.is_open:
            self.connection.close()
    
    def declare_queue(self, queue_name, durable=True):
        try:
            if not self.connect():
                return False
                
            self.channel.queue_declare(queue=queue_name, durable=durable)
            return True
        except Exception as e:
            return False
    
    def send_celery_task(self, queue_name, task_name, data):
        idempotency_key = generate_idempotency_key()
        payload = json.dumps({
            'args': [data], 
            'kwargs': {}, 
            'id': idempotency_key, 
            'task': task_name  
        })
        self.publish_message(queue_name, payload)
    
    
    def publish_message(self, queue_name, message):
        try:
            if not self.connect():
                return False

            properties = pika.BasicProperties(
                delivery_mode=2,  # Make message persistent
                content_type='application/json'
            )
            
            # Ensure queue exists
            self.declare_queue(queue_name)
            
            # Convert message to JSON string if it's a dict
            if isinstance(message, dict):
                message = json.dumps(message)
                
            # Publish the message
            self.channel.basic_publish(
                exchange='',
                routing_key=queue_name,
                body=message,
                properties=properties
            )
            
            return True
        except Exception as e:
            return False



rabbitmq_publisher = RabbitMQPublisher()

