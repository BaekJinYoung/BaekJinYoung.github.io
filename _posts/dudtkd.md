```bash
sudo nano /etc/php/8.2/fpm/php.ini

upload_max_filesize = 100M
post_max_size = 100M

sudo service php8.2-fpm restart
```

```bash
sudo nano /etc/nginx/nginx.conf

http {
    ...
    client_max_body_size 100M;
    ...
}

sudo nano /etc/nginx/sites-available/default

server {
    ...
    client_max_body_size 100M;
    ...
}

# 설정 파일 문법 검토
sudo nginx -t

# Nginx 재시작
sudo service nginx restart

```

```bash
sudo nano .env

UPLOAD_MAX_SIZE=100M


sudo nano config/filesystems.php

// config/filesystems.php

return [
    ...

    'uploads' => [
        'max_size' => env('UPLOAD_MAX_SIZE', 100 * 1024 * 1024), // 100MB
    ],

    ...
];

php artisan config:cache

```

```bash
# PHP-FPM 설정 파일 열기
sudo nano /etc/php/8.2/fpm/pool.d/www.conf

php_value[upload_max_filesize] = 100M
php_value[post_max_size] = 100M


sudo service php8.2-fpm restart

```