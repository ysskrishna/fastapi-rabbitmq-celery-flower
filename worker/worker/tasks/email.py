import json
import logging
from celery_app import app
from core.config import Config
import requests

logger = logging.getLogger(__name__)


def send_email_via_brevo(from_, to_, subject, message):
    url = "https://api.brevo.com/v3/smtp/email"

    # Prepare the request payload
    payload = {
        "sender": {"email": from_},
        "to": [{"email": to_}],
        "subject": subject,
        "htmlContent": message
    }

    # Set the headers
    headers = {
        "accept": "application/json",
        "api-key": Config.BREVO_API_KEY,
        "content-type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    response_json = response.json()
    
    logger.info(f"Email sent successfully to {to_} with id {response_json.get('id', None)}")
    return response_json




@app.task(name='email.process_email', bind=True, max_retries=3)
def process_email(self, body):
    try:
        # Parse payload if it's a string
        if isinstance(body, str):
            payload = json.loads(body)
        else:
            payload = body
            
        # Extract message data
        id = payload.get('id')
        from_ = payload.get('from_')
        to_ = payload.get('to_')
        subject = payload.get('subject')
        message = payload.get('message')
        logger.info(f"Processing email from {from_} to {to_}...")
        
        send_email_via_brevo(from_, to_, subject, message)
        
        logger.info(f"Successfully processed email ID: {id}")
        return True
        
    except Exception as exc:
        logger.error(f"Error processing email: {exc}")
        # Retry with exponential backoff
        self.retry(exc=exc, countdown=2 ** self.request.retries)