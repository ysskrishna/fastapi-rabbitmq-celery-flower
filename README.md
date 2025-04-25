# FastAPI RabbitMQ Celery Flower Application

A distributed application for sending SMS and emails using FastAPI, RabbitMQ, Celery, Flower and PostgreSQL.

### Features
- **Distributed Messaging System**: Implemented a robust architecture for message processing using FastAPI, RabbitMQ, Celery, and PostgreSQL
- **SMS Notifications**: Integration with Twilio API for sending SMS messages
- **Email Notifications**: Integration with Brevo (formerly Sendinblue) for sending transactional emails
- **Message Queuing**: Separate queues for SMS and email tasks to optimize message processing
- **Database Persistence**: PostgreSQL integration for storing and tracking message status
- **Containerization**: Full Docker support with docker-compose for easy deployment
- **Real-time Monitoring**: Flower dashboard for monitoring Celery workers and task execution
- **API Documentation**: Swagger UI for easy API testing and documentation

### Technical Highlights
- **FastAPI Web Server**: RESTful API endpoints for triggering notifications
- **Celery Workers**: Background task processing for non-blocking operations
- **RabbitMQ Message Broker**: Reliable message queuing with management interface
- **Health Checks**: Service health monitoring for all components
- **Environment Configuration**: Separate environment configurations for web and worker components
- **Dependency Management**: Poetry for Python dependency management

### Infrastructure
- **Database**: PostgreSQL 14
- **Message Broker**: RabbitMQ 3 with Management Plugin
- **Monitoring**: Celery Flower dashboard with authentication
- **Service Orchestration**: Docker Compose with health checks and dependency management 

## Setup and Run

1. Clone the repository:
   ```bash
   git clone https://github.com/ysskrishna/fastapi-rabbitmq-celery-flower
   cd fastapi-rabbitmq-celery-flower
   ```

2. Update environment variables:

   **For webserver/.env:**
   ```
   TWILIO_FROM_PHONE="your-twilio-phone-number"
   BREVO_FROM_EMAIL="your-brevo-from-email" 
   ```

   **For worker/.env:**
   ```
   TWILIO_ACCOUNT_SID="your-twilio-account-sid"
   TWILIO_AUTH_TOKEN="your-twilio-auth-token"
   BREVO_API_KEY="your-brevo-api-key"
   ```

3. Run the application using Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. Access the application:
   - Swagger API documentation: `http://localhost:8000/docs`
   - RabbitMQ Management UI: `http://localhost:15672/` (Username: admin_user, Password: admin_pass)
   - Flower dashboard: `http://localhost:5555/` (Username: admin, Password: supersecret)

## Development

To modify the application:

1. Update code in the `webserver` or `worker` directories
2. Restart the containers:
   ```bash
   docker-compose down
   docker-compose up -d
   ```

## Docker Commands

```bash
# Start all containers
docker compose up --build

# Stop all containers
docker compose down

# Stop and delete volumes
docker compose down -v
```


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Copyright (c) 2025 Y. Siva Sai Krishna

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0) License - see the [LICENSE](LICENSE) file for details.