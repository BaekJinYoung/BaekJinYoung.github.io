---
title: laravel new project
layout: default
---

# PHP, Laravel 인스톨러 설치하기 Installing PHP and the Laravel Installer

첫 번째 라라벨 애플리케이션을 생성하기 전에, 로컬 컴퓨터에 PHP, Composer, 그리고 라라벨 설치 프로그램이 설치되어 있는지 확인합니다.

또한 애플리케이션의 프론트엔드 에셋을 컴파일할 수 있도록 Node와 NPM 또는 Bun 중 하나를 설치해야 합니다.

로컬 컴퓨터에 PHP와 Composer가 설치되어 있지 않은 경우, 다음 명령어를 통해 macOS, Windows 또는 Linux에 PHP, Composer, 라라벨 설치 프로그램을 설치할 수 있습니다.

Linux
```
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.5)"
```

# Creating an Application

$ pwd
/c/Users/JIN

jin@LAPTOP-EL0J7BOC MINGW64 ~ (master)
$ cd portfolio

jin@LAPTOP-EL0J7BOC MINGW64 ~/portfolio (master)
$ laravel new portfolio


애플리케이션이 생성되면 dev Composer 스크립트를 사용하여 Laravel의 로컬 개발 서버, 큐 워커 및 Vite 개발 서버를 시작할 수 있습니다.
```bash
cd portfolio
npm install && npm run build
composer run dev
```

개발 서버를 시작하면 웹 브라우저에서 http://localhost:8000으로 애플리케이션에 접속할 수 있습니다.


Illuminate\Database\QueryException
vendor\laravel\framework\src\Illuminate\Database\Connection.php:857
could not find driver (Connection: sqlite, Database: C:\Users\JIN\portfolio\database\database.sqlite, SQL: select * from "sessions" where "id" = oOhPwGiJGhN2Ytla7XaOwwgaOVYTO9q8ufT9eSXj limit 1)