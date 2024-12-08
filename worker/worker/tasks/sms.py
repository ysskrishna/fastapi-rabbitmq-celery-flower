import json
import logging
from celery_app import app
import requests
from core.config import Config
from requests.auth import HTTPBasicAuth

logger = logging.getLogger(__name__)

def send_sms_via_twilio(from_number, to_number, message_body):
    url = f"https://api.twilio.com/2010-04-01/Accounts/{Config.TWILIO_ACCOUNT_SID}/Messages.json"
    
    data = {
        'From': from_number,
        'To': to_number,
        'Body': message_body
    }
    
    response = requests.post(url, data=data, auth=HTTPBasicAuth(Config.TWILIO_ACCOUNT_SID, Config.TWILIO_AUTH_TOKEN))
    response.raise_for_status()
    
    response_json = response.json()
    
    logger.info(f"SMS sent successfully to {to_number} with sid {response_json.get('sid', None)}")
    return response_json



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
        from_ = message.get('from_')
        to_ = message.get('to_')
        text_message = message.get('message')
        idempotency_key = message.get('idempotency_key')
        
        logger.info(f"Processing SMS {sms_id} from {from_} to {to_}: {text_message[:20]}...")
        
        send_sms_via_twilio(from_, to_, text_message)
        
        logger.info(f"Successfully processed SMS {sms_id} (idempotency_key: {idempotency_key})")
        return True
        
    except Exception as exc:
        logger.error(f"Error processing SMS: {exc}")
        # Retry with exponential backoff
        self.retry(exc=exc, countdown=2 ** self.request.retries)

