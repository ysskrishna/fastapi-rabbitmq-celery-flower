FROM python:3.12-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    POETRY_VERSION=2.1.1 \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1

# Install dependencies
RUN apt-get update && apt-get install -y curl && \
    curl -sSL https://install.python-poetry.org | python3 - && \
    apt-get remove -y curl && apt-get autoremove -y

# Set path for Poetry
ENV PATH="/root/.local/bin:$PATH"

# Set work directory
WORKDIR /app

# Copy only essential files
COPY pyproject.toml ./

# Install dependencies
RUN poetry install --no-root --only main

# Copy the rest of the application
COPY . .

# Environment variables for Celery
ENV PYTHONPATH=/app/worker

# Command to run Celery worker
CMD ["poetry", "run", "celery", "-A", "celery_app", "worker", "--loglevel=info", "-E"]