import json
import logging
from celery_app import app

logger = logging.getLogger(__name__)


@app.task(name='sms.process_sms', bind=True, max_retries=3)
def process_sms(self, body):
    try:
        # Parse message if it's a string
        if isinstance(body, str):
            message = json.loads(body)
        else:
            message = body
        
        # Extract message data
        sms_id = message.get('sms_id')
        phone = message.get('phone')
        text_message = message.get('message')
        idempotency_key = message.get('idempotency_key')
        
        logger.info(f"Processing SMS {sms_id} to {phone}: {text_message[:20]}...")
        
        # TODO: Implement actual SMS sending logic here
        # For example, integrate with Twilio or another SMS provider
        
        logger.info(f"Successfully processed SMS {sms_id} (idempotency_key: {idempotency_key})")
        return True
        
    except Exception as exc:
        logger.error(f"Error processing SMS: {exc}")
        # Retry with exponential backoff
        self.retry(exc=exc, countdown=2 ** self.request.retries)

