
## Docker commands

**start all containers**
```
docker compose up --build
```

**stop all containers**
```
docker compose down
```

**stop and delete volumes**
```
docker compose down -v
```

**Fastapi swagger documentation**
```
http://localhost:8000/docs
```

**Rabbitmq Dashboard**
```
http://localhost:15672/
```

**Flower dashboard**
```
http://localhost:5555/
```

**update webserver/.env variables**
```
TWILIO_FROM_PHONE="your-twilio-phone-number"
BREVO_FROM_EMAIL="your-brevo-from-email" 
```