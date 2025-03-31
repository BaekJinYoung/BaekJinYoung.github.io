---
layout: post
category: project
---

1. visitor 테이블 생성
2. 방문자 기록 모으기
3. block 테이블 생성
4. 차단 기능
```bash
php artisan make:migration create_blocks_table --create=blocks


php artisan make:model Block

```

1. visitor 테이블 생성

```bash
php artisan make:controller VisitorController

php artisan make:migration create_visitors_table --create=visitors

php artisan make:model Visitor
```

2. 방문자 기록 모으기