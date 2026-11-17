# FastAPI RabbitMQ Celery Flower Application

[![License: AGPL-3.0](https://img.shields.io/github/license/ysskrishna/fastapi-rabbitmq-celery-flower)](https://github.com/ysskrishna/fastapi-rabbitmq-celery-flower/blob/main/LICENSE.md) [![GitHub release](https://img.shields.io/github/v/release/ysskrishna/fastapi-rabbitmq-celery-flower?label=release)](https://github.com/ysskrishna/fastapi-rabbitmq-celery-flower/releases) [![Author site](https://img.shields.io/badge/author-ysskrishna.space-informational)](https://ysskrishna.space)

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

## Built and maintained by

FastAPI RabbitMQ Celery Flower Application is built and maintained by:

| | Name | GitHub | Role |
|---|------|--------|------|
| <img src="https://github.com/ysskrishna.png?size=120" width="60" height="60" alt="Y. Siva Sai Krishna"> | **Y. Siva Sai Krishna** | [@ysskrishna](https://github.com/ysskrishna) | Creator |

## Changelog

See [CHANGELOG](CHANGELOG.md) for release history.

## Support

If you find this project helpful:

- ⭐ Star the repository
- 🐛 [Report issues](https://github.com/ysskrishna/fastapi-rabbitmq-celery-flower/issues)
- 🔀 Submit pull requests
- 💝 [Sponsor on GitHub](https://github.com/sponsors/ysskrishna)

## License

AGPL-3.0 © [Y. Siva Sai Krishna](https://github.com/ysskrishna) — see [LICENSE.md](LICENSE.md) for details.

---

<p align="left">
  <a href="https://github.com/ysskrishna">Author's GitHub</a> •
  <a href="https://linkedin.com/in/ysskrishna">Author's LinkedIn</a> •
  <a href="https://ysskrishna.space">Author's site</a> •
  <a href="https://github.com/ysskrishna/fastapi-rabbitmq-celery-flower/issues">Report Issues</a>
</p>
