import json
import logging
from celery_app import app
import time

logger = logging.getLogger(__name__)


@app.task(name='email.process_email', bind=True, max_retries=3)
def process_email(self, body):
    try:
        # Parse message if it's a string
        if isinstance(body, str):
            message = json.loads(body)
        else:
            message = body
            
        # Extract message data
        email = message.get('email')
        subject = message.get('subject')
        text_message = message.get('message')
        idempotency_key = message.get('idempotency_key')
        
        logger.info(f"Processing email to {email}: {text_message[:20]}...")
        
        # TODO: Implement actual email sending logic here
        # For example, integrate with SMTP server or email service provider
        time.sleep(20)
        
        logger.info(f"Successfully processed email to {email} (idempotency_key: {idempotency_key})")
        return True
        
    except Exception as exc:
        logger.error(f"Error processing email: {exc}")
        # Retry with exponential backoff
        self.retry(exc=exc, countdown=2 ** self.request.retries)