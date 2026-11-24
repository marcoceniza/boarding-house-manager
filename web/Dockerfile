FROM php:8.4.28-fpm

# Install system deps + PHP extensions Laravel needs
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libzip-dev \
    zlib1g-dev \
    libssl-dev \
    libpq-dev \
    libxml2-dev \
    git \
    curl \
    unzip \
  && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip opcache xml \
  && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2.11.2 /usr/bin/composer /usr/bin/composer

# Set working dir
WORKDIR /var/www/html

# Frontend assets are built on the host with npm; no Node tooling in this image.

USER www-data

CMD ["php-fpm"]
