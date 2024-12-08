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
        # Parse payload if it's a string
        if isinstance(body, str):
            payload = json.loads(body)
        else:
            payload = body
        
        # Extract payload data
        id = payload.get('id')
        from_ = payload.get('from_')
        to_ = payload.get('to_')
        message = payload.get('message')
        
        logger.info(f"Processing SMS {id} from {from_} to {to_}: {message[:20]}...")
        
        send_sms_via_twilio(from_, to_, message)
        
        logger.info(f"Successfully processed SMS ID: {id}")
        return True
        
    except Exception as exc:
        logger.error(f"Error processing SMS: {exc}")
        # Retry with exponential backoff
        self.retry(exc=exc, countdown=2 ** self.request.retries)

