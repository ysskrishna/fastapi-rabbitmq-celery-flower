# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-04-27

### Added
- **Client Application**
  - Implemented Next.js client with shadcn/ui components
  - Added template preview pages for SMS and email
  - Created creator page
  - Integrated client with webserver API
  - Added pagination support for template listings
  - SMS preview layout and template card styling for improved readability
  - Pagination functionality in homepage
  - HTML rendering in email previews with prettify function
  - Logo and metadata configuration
  
### Changed
- **Docker Configuration**
  - Added Docker configuration for client application
  - Updated docker-compose.yml to include client service
  - Added proper container networking between client and webserver


## [1.0.0] - 2025-04-25

### Added
- **Distributed Messaging System**
  - Implemented FastAPI for RESTful API endpoints
  - Integrated RabbitMQ as message broker with management interface
  - Set up Celery for background task processing
  - Added Flower dashboard for real-time task monitoring
  - Configured PostgreSQL for message persistence

- **Notification Services**
  - Integrated Twilio API for SMS notifications
  - Integrated Brevo (formerly Sendinblue) for email notifications
  - Implemented separate queues for SMS and email tasks
  - Added idempotency key generation for message deduplication

- **Infrastructure & Configuration**
  - Containerized application using Docker and docker-compose
  - Implemented health checks for all services
  - Added environment-based configuration for web and worker components
  - Set up Poetry for dependency management
  - Configured separate virtual environments for web and worker

- **API Features**
  - Added Swagger UI documentation at `/docs`
  - Implemented RESTful endpoints for notifications
  - Added root endpoint health check

- **Worker Configuration**
  - Configured worker concurrency (2 workers)
  - Implemented task acknowledgment after processing
  - Added task requeuing on worker failure
  - Set up result backend with PostgreSQL

- **Monitoring & Management**
  - RabbitMQ Management UI (port 15672)
  - Flower monitoring dashboard (port 5555)
  - Database health monitoring
  - Service dependency management


[1.1.0]: https://github.com/ysskrishna/fastapi-rabbitmq-celery-flower/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ysskrishna/fastapi-rabbitmq-celery-flower/releases/tag/v1.0.0