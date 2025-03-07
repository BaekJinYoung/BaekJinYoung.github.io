#!/bin/bash

# 명령어 실행 중 오류(비정상 종료)가 발생하면 즉시 스크립트를 종료
set -e

# 캐시 삭제
sudo dnf clean all
sudo dnf clean packages
sudo dnf autoremove

sudo dnf update -y

# nano 설치
sudo dnf install nano -y

# EPEL 및 Remi 저장소 설치
echo "EPEL 및 Remi 저장소 설치 중..."
sudo dnf install -y epel-release
sudo dnf install -y dnf-utils
sudo dnf install -y http://rpms.remirepo.net/enterprise/remi-release-8.rpm

# 기존 PHP 모듈 비활성화
echo "기존 PHP 모듈 초기화..."
sudo dnf module reset php -y

# PHP 8.4 모듈 활성화
echo "PHP 8.4 모듈 활성화..."
sudo dnf module enable php:remi-8.4 -y

# PHP 8.4 및 확장 모듈 설치
echo "PHP 8.4 및 확장 모듈 설치 중..."
sudo dnf install -y php php-cli php-fpm php-mysqlnd php-xml php-mbstring php-curl php-zip php-gd php-bcmath php-sqlite3

# PHP-FPM 서비스 시작 및 활성화
echo "PHP-FPM 서비스 시작..."
sudo systemctl enable --now php-fpm

# nginx 설치
echo "NGINX 서비스 설치 중..."
sudo dnf -y install nginx

# NGINX 서비스 시작 및 활성화
echo "NGINX 서비스 시작..."
sudo systemctl enable --now nginx
sudo systemctl start nginx

#mysql 설치
dnf -y upgrade-minimal
dnf -y install https://dev.mysql.com/get/mysql84-community-release-el8-1.noarch.rpm
dnf module reset mysql
# 2. MySQL 기본 모듈 비활성화 (필요한 경우)
echo "기본 MySQL 모듈 비활성화..."
sudo dnf module disable mysql -y
dnf -y install mysql-community-server


nano /etc/vsftpd/vsftpd.conf


sudo firewall-cmd --zone=public --add-port=20-21/tcp --permanent

sudo firewall-cmd --reload