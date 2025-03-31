```php
// .env

MAIL_MAILER=smtp
MAIL_HOST=smtp.naver.com
MAIL_PORT=465
MAIL_USERNAME=yourname@naver.com
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=yourname@naver.com
MAIL_FROM_NAME="${APP_NAME}"
```

```php
// config/mail.php

'mailers' => [
    'smtp' => [
        'transport' => env('MAIL_MAILER', 'smtp'),
        'host' => env('MAIL_HOST', 'smtp.mailgun.org'),
        'port' => env('MAIL_PORT', 587),
        'encryption' => env('MAIL_ENCRYPTION', 'tls'),
        'username' => env('MAIL_USERNAME'),
        'password' => env('MAIL_PASSWORD'),
        'auth_mode' => env('MAIL_AUTH_MODE'),
    ],
    // other mailers...
],
```

```bash

php artisan make:mail ExampleMail
```

```bash
php artisan make:migration create_files_table
php artisan migrate

```