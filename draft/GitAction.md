#!/bin/bash
-


```bash
#!/bin/bash
```

Shebang(셰뱅)이라고 불리는 구문이다.
Unix/Linux 스크립트 파일의 첫 번째 줄에 사용되며, 해당 스크립트를 실행할 때 어떤 인터프리터를 사용할지 지정한다.

이 스크립트가 Bash 셸에서 실행됨을 지정한다.
#!/bin/sh 와 비슷하지만, Bash가 더 많은 기능을 제공한다.

#! Shebang을 나타내는 문자이다.
#는 주석을 의미하지만 #!로 시작하면 특별한 의미를 가진다.
이 뒤에 실행할 프로그램(인터프리터)의 경로를 지정한다.

/bin/bash
Bash 셸의 절대 경로이다. 
스크립트 실행 시 Bash 셸이 사용된다.

필요성
1. 명확한 인터프리터 지정
2. 호환성 보장: 다른 환경에서도 스크립트를 올바르게 실행할 수 있도록 보장한다.
3. 자동 실행 가능: Shebang이 없으면 스크립트를 실행할 때 인터프리터를 명시적으로 호출해야 한다. Shebang이 있다면 파일에 실행 권한을 주고 직접 실행할 수 있다.

Bash 외 다른 예시

Python 스크립트:
```bash
#!/usr/bin/python3
```
Python 인터프리터를 사용해 실행.

Perl 스크립트
```bash
#!/usr/bin/perl
```

POSIX 호환 셸 스크립트
```bash
#!/bin/sh
```


Node.js(JavaScript 실행)
```bash
#!/usr/bin/node
```

Bash 경로 유연화
때로는 시스템에 따라 Bash 경로가 다를 수 있다.
이를 해결하기 위해 env 명령을 사용해 인터프리터를 자동으로 찾도록 지정할 수 있다.

```bash
#!/usr/bin/env bash
```

이 방식은 시스템 환경 변수 PATH를 따라 Bash의 위치를 검색하므로 경로에 의존적이지 않는다.

set -e
-

```bash
set -e
```

스크립트 실행 중 하나라도 명령어가 실패하면 즉시 종료하도록 설정한다.
실패란 명령아가 0이 아닌 종료 상태 코드(exit status)를 반환하는 경우를 의미한다.

실패한 명령어의 에러를 무시하지 않는다.

작동 원리
정상적인 명령어 실행:
명령어가 성공적으로 실행되면(종료 상태 코드 0) 다음 명령어로 계속 진행합니다.
실패하는 명령어 실행:
명령어가 실패하면(종료 상태 코드가 0이 아님) 스크립트를 즉시 종료합니다.
실패가 발생한 위치:
실패한 명령어가 호출된 위치에서 스크립트가 종료됩니다.

장점
오류를 조기에 감지:
오류가 발생했을 때 스크립트를 계속 실행하지 않으므로, 원치 않는 부작용을 방지합니다.
디버깅 용이:
오류가 발생한 명령어 바로 다음에서 스크립트가 멈추므로, 원인을 빠르게 찾을 수 있습니다.
안정성:
배포 및 설치 스크립트와 같이 정확한 실행이 필요한 환경에서 유용합니다.

제한 사항
명시적으로 처리된 명령어는 무시:
if 조건문이나 || 연산자를 사용해 오류를 명시적으로 처리한 경우, set -e는 해당 명령어 실패를 무시합니다.
```bash
#!/bin/bash
set -e

echo "Step 1: Start"
if false; then
    echo "This won't run"
fi
echo "Step 2: This runs because the error was handled"
```

실제 활용
1. 배포 및 설치 스크립트:
   설치 과정에서 실패가 발생하면, 스크립트를 종료해 중단 상태를 바로 확인할 수 있습니다.
2. 데이터 처리 파이프라인:
   중요한 데이터 처리 명령어가 실패했을 때, 즉시 종료해 데이터를 잘못 처리하는 것을 방지합니다.


관련 옵션
set -u: 정의되지 않은 변수를 사용하면 스크립트를 종료.
set -o pipefail: 파이프라인 명령 중 하나라도 실패하면 전체를 실패로 간주.
set +e: 스크립트에서 -e를 비활성화.

sudo apt-get clean --assume-yes
-

```bash
sudo apt-get clean --assume-yes
sudo apt-get update --assume-yes
sudo apt-get upgrade --assume-yes
```

apt-get Debian 계열(Linux)에서 패키지 설치, 업데이트, 업그레이드를 수행하는 명령어이다.
clean 로컬의 apt 패키지 캐시를 제거하여 디스크 공간을 확보한다.
APT는 패키지를 설치하거나 업데이트할 때 .deb 파일(패키지 설치 파일)을 다운로드한 후 캐시에 저장한다.
이 명령은 다운로드한 패키지 파일을 삭제해 불필요한 디스크 사용을 줄이는 데 유용하다.

update 패키지 목록 최신화

upgrade 설치된 패키지를 최신 버전으로 업그레이드


--assume-yes 사용자 입력 없이 자동으로 "예"를 선택한다.
자동으로 진행되므로, 실수로 시스템에 문제를 일으킬 수 있는 작업도 확인 없이 실행될 수 있습니다.
주의가 필요합니다.


업그레이드 후 재부팅 필요:

일부 패키지(커널 등)는 업그레이드 후 시스템을 재부팅해야 적용됩니다.
정기적 실행 권장:

이 세 명령어를 정기적으로 실행하면 시스템이 최신 상태로 유지되고, 보안 취약점이 패치됩니다.

install_composer() 
-

```bash
install_composer() {
    curl -sS https://getcomposer.org/installer | php
    sudo mv composer.phar /usr/local/bin/composer
    sudo chmod +x /usr/local/bin/composer
}
```

Composer(의존성 관리 도구)를 설치하는 함수이다.

curl은 파일을 다운로드하거나 데이터를 전송할 수 있는 명령줄 도구이다.
-sS 옵션은 진행 상태를 숨기고, 오류가 발생하면 메시지만 출력하도록 설정한다.
https://getcomposer.org/installer 에서 Composer 설치 스크립트를 다운로드하여 php로 실행한다.
Composer를 설치하기 위해 필요한 composer.phar 파일을 생성한다.

mv 파일을 이동하거나 이름을 변경하는 명령어이다.
composer.phar 파일을 /usr/local/bin/composer 경로로 이동시킨다.
composer 명령을 시스템 전역에서 사용 가능하게 한다.

chmod +x 파일을 실행 가능하도록 권한을 설정한다.
chmod 파일의 권한을 변경하는 명령어
+x 실행 권한을 추가하는 옵션

install_laravel
-

```bash
install_laravel() {
    sudo composer global require laravel/installer
    sudo ln -s ~/.composer/vendor/bin/laravel /usr/local/bin/laravel
}
```

Laravel을 설치하는 함수이다.

composer global require Composer를 통해 laravel/installer 패키지를 전역적으로 설치한다.
laravel/installer는 Laravel 설치 도구 패키지이다.


ln은 심볼릭 링크를 생성하는 명령어이다.
-s 옵션은 심볼릭 링크를 생성하도록 설정한다.
~/.composer/vendor/bin/laravel 은 Laravel 설치 도구의 실제 경로이다.
/usr/local/bin/laravel은 심볼릭 링크가 생성될 위치이다.
이 명령어는 laravel 명령어를 시스템 어디에서나 실행할 수 있도록 설정한다.

ln -s 심볼릭 링크를 생성한다. Laravel 명령을 시스템 전역에서 사용할 수 있도록 설정한다.

install_packages
-
```bash
install_packages() {
    sudo apt install software-properties-common
    sudo add-apt-repository ppa:ondrej/php
    sudo apt update

    sudo apt-get install -y \
        curl \
        git \
        unzip \
        zip \
        nginx \
        mysql-server \
        mysql-client \
        php8.4-cli php8.4-fpm php8.4-mysql php8.4-xml php8.4-mbstring php8.4-curl php8.4-zip php8.4-gd php8.4-bcmath php8.4-sqlite3 \
        phpmyadmin \
        vsftpd \
        certbot \
        python3-certbot-nginx
}
```

필수 패키지 설치 함수

apt install은 지정된 패키지를 설치하는 명령어이다.
software-properties-common은 PPA(Personal Package Archive)를 관리할 수 있도록 지원하는 패키지이다.

add-apt-repository 는 새로운 PPA를 추가하는 명령어이다.

apt update는 패키지 목록을 업데이트하여 최신 정보를 가져오는 명령어이다.



-y 설치 중 사용자 입력을 요구하지 않고 계속 진행한다.

기본 도구
curl 데이터 전송을 위한 도구
git 버전 관리 도구
unzip, zip 압축 파일 해제 및 생성 도구

웹 서버 및 데이터베이스
nginx 웹 서버
mysql-server, mysql-client MySQL 데이터베이스 서버 및 클라이언트

PHP 및 확장 모듈
php8.4-cli, php8.4-fpm PHP 8.4 실행 환경 및 FastCGI Process Manager
확장 모듈

관리 도구
phpmyadmin MySQL 관리를 위한 웹 인터페이스.
vsftpd FTP 서버 소프트웨어

SSL 인증서
certbot, python3-certbot-nginx Nginx를 위한 SSL 인증서 발급 및 갱신 도구

configure_firewall
-
```bash
configure_firewall() {
    sudo ufw allow OpenSSH
    sudo ufw allow mysql
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    sudo ufw allow 20:21/tcp
    sudo ufw allow 30000:31000/tcp
    sudo ufw --force enable
}
```

Ubuntu에서 UFW(Uncomplicated Firewall)를 설정하여 서버로의 네트워크 트래픽을 제어한다.

ufw 간단한 방화벽 설정 도구
allow 지정한 포트나 서비스를 방화벽에서 허용한다.

OpenSSH SSH(Secure Shell) 연결을 허용한다.
MySQL 서버가 사용하는 기본 포트(3306 번)를 방화벽에서 허용한다.

80번 포트는 HTTP 트래픽을 처리한다.
443번 포트는 HTTPS 트래픽을 처리한다.

20번 및 21번 포트는 FTP 데이터 전송 및 명령 채널에 사용된다.

30000번에서 31000번까지의 포트는 FTP의 패시브 모드 데이터 전송에 사용된다.

enable  UFW 방화벽을 활성화한다.
--force  사용자 확인 없이 바로 활성화한다.

main() {
-
```bash
main() {
    install_packages
    install_composer
    install_laravel
    configure_firewall
}
```

main 함수

전체 스크립트의 핵심 흐름을 관리하며, 위에서 정의한 함수를 순서대로 호출한다.

main() 함수는 전체 과정을 조정한다.

main() 이 함수는 프로그램의 진입점(entry point) 으로 작동한다.
여러 함수를 호출하여 전체 설치 및 설정 프로세스를 단계적으로 실행한다.


```bash
main
```

마지막 줄에서 main 함수를 호출하여 스크립트를 실행한다.

main 자체는 특정 운영체제나 도구에서 기본적으로 제공되는 명령어가 아니다. 대신 특정 스크립트나 자동화된 작업에서 main이라는 이름을 가진 함수나 명령어 블록이 작성될 수 있다. 보통 main은 해당 스크립트나 프로그램의 핵심 실행 흐름을 정의하는 이름으로 사용된다.