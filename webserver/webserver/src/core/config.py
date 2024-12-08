import os
from dotenv import load_dotenv

load_dotenv()


class Config(object):
    TWILIO_FROM_PHONE = os.getenv('TWILIO_FROM_PHONE')
    BREVO_FROM_EMAIL = os.getenv('BREVO_FROM_EMAIL')
    
    # Database
    DB_HOST = os.getenv('DB_HOST')
    DB_PORT = int(os.getenv('DB_PORT'))
    DB_USER = os.getenv('DB_USER')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_NAME = os.getenv('DB_NAME')
    
    # RabbitMQ
    RABBITMQ_HOST = os.getenv('RABBITMQ_HOST')
    RABBITMQ_PORT = int(os.getenv('RABBITMQ_PORT'))
    RABBITMQ_USER = os.getenv('RABBITMQ_USER')
    RABBITMQ_PASSWORD = os.getenv('RABBITMQ_PASSWORD')
    RABBITMQ_VHOST = os.getenv('RABBITMQ_VHOST')
    
    DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    CELERY_BROKER_URL = f"amqp://{RABBITMQ_USER}:{RABBITMQ_PASSWORD}@{RABBITMQ_HOST}:{RABBITMQ_PORT}"
