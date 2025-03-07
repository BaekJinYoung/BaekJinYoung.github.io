Content Too Large
Illuminate\Http\Exceptions\PostTooLargeException



```bash
php --ini



sudo nano /etc/php/8.4/fpm/php.ini

upload_max_filesize = 100M
post_max_size = 100M

sudo service php8.4-fpm restart
```

```bash
sudo nano /etc/nginx/nginx.conf

http {
    ...
    client_max_body_size 500M;
    ...
}

sudo nano /etc/nginx/sites-available/default

server {
    ...
    client_max_body_size 500M;
    ...
}

# 설정 파일 문법 검토
sudo nginx -t

# Nginx 재시작
sudo service nginx restart

```

```bash
sudo nano .env

UPLOAD_MAX_SIZE=500M


sudo nano config/filesystems.php

// config/filesystems.php

return [
    ...

    'uploads' => [
        'max_size' => env('UPLOAD_MAX_SIZE', 100 * 1024 * 1024), // 100MB
    ],

    ...
];

sudo php artisan config:cache

```

```bash
# PHP-FPM 설정 파일 열기
sudo nano /etc/php/8.4/fpm/pool.d/www.conf

php_value[upload_max_filesize] = 500M
php_value[post_max_size] = 500M


sudo service php8.4-fpm restart

```