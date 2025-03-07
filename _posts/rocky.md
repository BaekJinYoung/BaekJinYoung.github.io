```bash
user@DESKTOP-HO0Q2EF MINGW64 ~/Desktop/key
$ ssh -i "rocky.pem" ec2-user@ec2-3-39-234-0.ap-northeast-2.compute.amazonaws.com
Last login: Thu Mar  6 02:30:53 2025 from 121.131.26.148
[ec2-user@ip-172-31-40-180 ~]$
```

rocky 설치
https://leediz.tistory.com/26



ftp
```bash
[root@ip-172-31-40-180 username]# dnf install vsftpd
Last metadata expiration check: 2:05:03 ago on Thu 06 Mar 2025 02:48:16 AM UTC.
Dependencies resolved.
=======================================================================================================================================
 Package                      Architecture                 Version                               Repository                       Size
=======================================================================================================================================
Installing:
 vsftpd                       x86_64                       3.0.3-36.el8                          appstream                       180 k

Transaction Summary
=======================================================================================================================================
Install  1 Package

Total download size: 180 k
Installed size: 347 k
Is this ok [y/N]: y
Downloading Packages:
vsftpd-3.0.3-36.el8.x86_64.rpm                                                                         187 kB/s | 180 kB     00:00
---------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                  124 kB/s | 180 kB     00:01
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                               1/1
  Installing       : vsftpd-3.0.3-36.el8.x86_64                                                                                    1/1
  Running scriptlet: vsftpd-3.0.3-36.el8.x86_64                                                                                    1/1
  Verifying        : vsftpd-3.0.3-36.el8.x86_64                                                                                    1/1

Installed:
  vsftpd-3.0.3-36.el8.x86_64

Complete!


[root@ip-172-31-40-180 username]# systemctl start vsftpd
[root@ip-172-31-40-180 username]# systemctl enable vsftpd
Created symlink /etc/systemd/system/multi-user.target.wants/vsftpd.service → /usr/lib/systemd/system/vsftpd.service.


```

```bash
sudo dnf install -y firewalld

Complete!



[root@ip-172-31-40-180 username]# sudo systemctl start firewalld
[root@ip-172-31-40-180 username]# sudo systemctl enable firewalld
[root@ip-172-31-40-180 username]# sudo firewall-cmd --add-service=ftp --permanent --zone=public
success
[root@ip-172-31-40-180 username]# sudo firewall-cmd --reload
success

```
https://ilovestorage.tistory.com/27




nginx
```bash
[root@ip-172-31-40-180 username]# dnf module list nginx
Last metadata expiration check: 1:25:02 ago on Thu 06 Mar 2025 02:48:16 AM UTC.
Rocky Linux 8 - AppStream
Name                    Stream                     Profiles                    Summary
nginx                   1.14 [d]                   common [d]                  nginx webserver
nginx                   1.16                       common [d]                  nginx webserver
nginx                   1.18                       common [d]                  nginx webserver
nginx                   1.20                       common [d]                  nginx webserver
nginx                   1.22                       common [d]                  nginx webserver
nginx                   1.24                       common [d]                  nginx webserver

Hint: [d]efault, [e]nabled, [x]disabled, [i]nstalled
[root@ip-172-31-40-180 username]# dnf -y install nginx

Complete!


[root@ip-172-31-40-180 username]# systemctl enable nginx
Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service → /usr/lib/systemd/system/nginx.service.
[root@ip-172-31-40-180 username]# systemctl start nginx

/etc/nginx/nginx.conf
```

```bash
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }

# Settings for a TLS enabled server.
#
#    server {
#        listen       443 ssl http2 default_server;
#        listen       [::]:443 ssl http2 default_server;
#        server_name  _;
#        root         /usr/share/nginx/html;
#
#        ssl_certificate "/etc/pki/nginx/server.crt";
#        ssl_certificate_key "/etc/pki/nginx/private/server.key";
#        ssl_session_cache shared:SSL:1m;
#        ssl_session_timeout  10m;
#        ssl_ciphers PROFILE=SYSTEM;
#        ssl_prefer_server_ciphers on;
#
#        # Load configuration files for the default server block.
#        include /etc/nginx/default.d/*.conf;
#
#        location / {
#        }
#
#        error_page 404 /404.html;
#            location = /40x.html {
#        }
#
#        error_page 500 502 503 504 /50x.html;
#            location = /50x.html {
#        }
#    }

}
```

```bash
index index.php index.html index.htm;

location ~ \.php$ {
    try_files $uri $uri/ /index.php?$query_string;
    fastcgi_intercept_errors on;
    fastcgi_index  index.php;
    include        fastcgi_params;
    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    fastcgi_pass   php-fpm;
}

server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
        
        root         /home/username/BrainTracer/public;
        index index.php index.html;

        client_max_body_size 500M;

        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        location ~ \.php$ {
            fastcgi_intercept_errors on;
            fastcgi_index  index.php;
            include        fastcgi_params;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            fastcgi_pass   unix:/run/php-fpm/www.sock;
        }
        
        location ~ /\.(?!well-known).* {
            deny all;
        }
        
        error_page 404 /404.html;
        location = /40x.html {
            root /home/username/BrainTracer/public;
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /home/username/BrainTracer/public;
        }
    }
```

```bash
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    include /etc/nginx/conf.d/*.conf;

    

# Settings for a TLS enabled server.
#
#    server {
#        listen       443 ssl http2 default_server;
#        listen       [::]:443 ssl http2 default_server;
#        server_name  _;
#        root         /usr/share/nginx/html;
#
#        ssl_certificate "/etc/pki/nginx/server.crt";
#        ssl_certificate_key "/etc/pki/nginx/private/server.key";
#        ssl_session_cache shared:SSL:1m;
#        ssl_session_timeout  10m;
#        ssl_ciphers PROFILE=SYSTEM;
#        ssl_prefer_server_ciphers on;
#
#        # Load configuration files for the default server block.
#        include /etc/nginx/default.d/*.conf;
#
#        location / {
#        }
#
#        error_page 404 /404.html;
#            location = /40x.html {
#        }
#
#        error_page 500 502 503 504 /50x.html;
#            location = /50x.html {
#        }
#    }

}
```



php
```bash
[root@ip-172-31-40-180 username]# sudo dnf install -y epel-release

Last metadata expiration check: 0:03:25 ago on Thu 06 Mar 2025 05:20:05 AM UTC.
Package epel-release-8-21.el8.noarch is already installed.
Dependencies resolved.
Nothing to do.
Complete!
[root@ip-172-31-40-180 username]# sudo dnf install -y dnf-utils
Last metadata expiration check: 0:03:26 ago on Thu 06 Mar 2025 05:20:05 AM UTC.
Package yum-utils-4.0.21-25.el8.noarch is already installed.
Dependencies resolved.
Nothing to do.
Complete!

[root@ip-172-31-40-180 username]# yum install dnf-utils http://rpms.remirepo.net/enterprise/remi-release-8.rpm
Last metadata expiration check: 2:30:45 ago on Thu 06 Mar 2025 02:48:16 AM UTC.
remi-release-8.rpm                                                                                      32 kB/s |  37 kB     00:01
Package yum-utils-4.0.21-25.el8.noarch is already installed.
Dependencies resolved.
=======================================================================================================================================
 Package                         Architecture              Version                               Repository                       Size
=======================================================================================================================================
Installing:
 remi-release                    noarch                    8.10-2.el8.remi                       @commandline                     37 k
Installing dependencies:
 epel-release                    noarch                    8-18.el8                              extras                           24 k

Transaction Summary
=======================================================================================================================================
Install  2 Packages

Total size: 62 k
Total download size: 24 k
Installed size: 68 k
Is this ok [y/N]: y
Downloading Packages:
epel-release-8-18.el8.noarch.rpm                                                                        35 kB/s |  24 kB     00:00
---------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                   18 kB/s |  24 kB     00:01
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                               1/1
  Installing       : epel-release-8-18.el8.noarch                                                                                  1/2
  Running scriptlet: epel-release-8-18.el8.noarch                                                                                  1/2
Many EPEL packages require the CodeReady Builder (CRB) repository.
It is recommended that you run /usr/bin/crb enable to enable the CRB repository.

  Installing       : remi-release-8.10-2.el8.remi.noarch                                                                           2/2
  Running scriptlet: remi-release-8.10-2.el8.remi.noarch                                                                           2/2
  Verifying        : epel-release-8-18.el8.noarch                                                                                  1/2
  Verifying        : remi-release-8.10-2.el8.remi.noarch                                                                           2/2

Installed:
  epel-release-8-18.el8.noarch                                   remi-release-8.10-2.el8.remi.noarch

Complete!


yum -y update

Upgraded:
  epel-release-8-21.el8.noarch

Complete!



```

php 모듈
```bash
[root@ip-172-31-40-180 username]# yum module list php
Last metadata expiration check: 0:01:56 ago on Thu 06 Mar 2025 05:20:05 AM UTC.
Rocky Linux 8 - AppStream
Name                   Stream                       Profiles                                    Summary
php                    7.2 [d][e]                   common [d], devel, minimal                  PHP scripting language
php                    7.3                          common [d], devel, minimal                  PHP scripting language
php                    7.4                          common [d], devel, minimal                  PHP scripting language
php                    8.0                          common [d], devel, minimal                  PHP scripting language
php                    8.2                          common [d], devel, minimal                  PHP scripting language

Remi's Modular repository for Enterprise Linux 8 - x86_64
Name                   Stream                       Profiles                                    Summary
php                    remi-7.2                     common [d], devel, minimal                  PHP scripting language
php                    remi-7.3                     common [d], devel, minimal                  PHP scripting language
php                    remi-7.4                     common [d], devel, minimal                  PHP scripting language
php                    remi-8.0                     common [d], devel, minimal                  PHP scripting language
php                    remi-8.1                     common [d], devel, minimal                  PHP scripting language
php                    remi-8.2                     common [d], devel, minimal                  PHP scripting language
php                    remi-8.3                     common [d], devel, minimal                  PHP scripting language
php                    remi-8.4                     common [d], devel, minimal                  PHP scripting language

Hint: [d]efault, [e]nabled, [x]disabled, [i]nstalled


Remi 저장소 활성화

sudo dnf install -y epel-release
sudo dnf install -y dnf-utils
sudo dnf install -y http://rpms.remirepo.net/enterprise/remi-release-8.rpm


기존 PHP 모듈 비활성화 (초기화)
[root@ip-172-31-40-180 username]# sudo dnf module reset php -y
Last metadata expiration check: 0:04:07 ago on Thu 06 Mar 2025 05:20:05 AM UTC.
Dependencies resolved.
=======================================================================================================================================
 Package                         Architecture                   Version                          Repository                       Size
=======================================================================================================================================
Resetting modules:
 php

Transaction Summary
=======================================================================================================================================

Complete!

PHP 8.4 모듈 활성화
[root@ip-172-31-40-180 username]# sudo dnf module enable php:remi-8.4 -y

Last metadata expiration check: 0:04:49 ago on Thu 06 Mar 2025 05:20:05 AM UTC.
Dependencies resolved.
=======================================================================================================================================
 Package                         Architecture                   Version                          Repository                       Size
=======================================================================================================================================
Enabling module streams:
 php                                                            remi-8.4

Transaction Summary
=======================================================================================================================================

Complete!

PHP 8.4 및 확장 모듈 설치
sudo dnf install -y php php-cli php-fpm php-mysqlnd php-xml php-mbstring php-curl php-zip php-gd php-bcmath php-sqlite3

Upgraded:
  libzip-1.11.3-1.el8.remi.x86_64             php-8.4.4-1.el8.remi.x86_64             php-cli-8.4.4-1.el8.remi.x86_64
  php-common-8.4.4-1.el8.remi.x86_64          php-fpm-8.4.4-1.el8.remi.x86_64         php-mbstring-8.4.4-1.el8.remi.x86_64
  php-mysqlnd-8.4.4-1.el8.remi.x86_64         php-pdo-8.4.4-1.el8.remi.x86_64         php-pecl-zip-1.22.5-1.el8.remi.8.4.x86_64
  php-xml-8.4.4-1.el8.remi.x86_64
Installed:
  capstone-4.0.2-5.el8.x86_64                 fribidi-1.0.4-9.el8.x86_64               gd3php-2.3.3-8.el8.remi.x86_64
  graphite2-1.3.10-10.el8.x86_64              harfbuzz-1.7.5-4.el8.x86_64              libaom-3.6.1-1.el8.x86_64
  libavif-0.10.1-3.el8.x86_64                 libdav1d-0.5.2-2.el8.x86_64              libimagequant-2.12.5-1.el8.x86_64
  libraqm-0.7.0-4.el8.x86_64                  libsodium-1.0.18-2.el8.x86_64            oniguruma5php-6.9.10-1.el8.remi.x86_64
  php-bcmath-8.4.4-1.el8.remi.x86_64          php-gd-8.4.4-1.el8.remi.x86_64           php-opcache-8.4.4-1.el8.remi.x86_64
  php-sodium-8.4.4-1.el8.remi.x86_64          svt-av1-libs-0.8.7-1.el8.x86_64

Complete!



PHP-FPM 서비스 활성화 및 실행
[root@ip-172-31-40-180 username]# sudo systemctl enable --now php-fpm
Created symlink /etc/systemd/system/multi-user.target.wants/php-fpm.service → /usr/lib/systemd/system/php-fpm.service.


[root@ip-172-31-40-180 username]# php -v
PHP 8.4.4 (cli) (built: Feb 11 2025 15:36:20) (NTS gcc x86_64)
Copyright (c) The PHP Group
Built by Remi's RPM repository <https://rpms.remirepo.net/> #StandWithUkraine
Zend Engine v4.4.4, Copyright (c) Zend Technologies
    with Zend OPcache v8.4.4, Copyright (c), by Zend Technologies

```
https://hansoul.tistory.com/209

mysql
```bash
[root@ip-172-31-40-180 username]# dnf -y upgrade-minimal
Last metadata expiration check: 0:08:25 ago on Thu 06 Mar 2025 05:20:05 AM UTC.
Dependencies resolved.
Nothing to do.
Complete!

```

mysql84-community-release-el8-1.noarch.rpm
```bash
dnf -y install https://dev.mysql.com/get/mysql84-community-release-el8-1.noarch.rpm

[root@ip-172-31-40-180 username]# dnf -y install https://dev.mysql.com/get/mysql84-community-release-el8-1.noarch.rpm
Last metadata expiration check: 0:12:54 ago on Thu 06 Mar 2025 05:20:05 AM UTC.
mysql84-community-release-el8-1.noarch.rpm                                                             2.8 kB/s |  15 kB     00:05
Dependencies resolved.
=======================================================================================================================================
 Package                                      Architecture              Version                  Repository                       Size
=======================================================================================================================================
Installing:
 mysql84-community-release                    noarch                    el8-1                    @commandline                     15 k

Transaction Summary
=======================================================================================================================================
Install  1 Package

Total size: 15 k
Installed size: 17 k
Downloading Packages:
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                               1/1
  Installing       : mysql84-community-release-el8-1.noarch                                                                        1/1
  Running scriptlet: mysql84-community-release-el8-1.noarch                                                                        1/1
   Warning: native mysql package from platform vendor seems to be enabled.
    Please consider to disable this before installing packages from repo.mysql.com.
    Run: yum module -y disable mysql

  Verifying        : mysql84-community-release-el8-1.noarch                                                                        1/1

Installed:
  mysql84-community-release-el8-1.noarch

Complete!

```

```bash
[root@ip-172-31-40-180 username]# dnf module reset mysql
MySQL 8.4 LTS Community Server                                                                         2.4 MB/s | 844 kB     00:00
MySQL Connectors Community                                                                             623 kB/s | 150 kB     00:00
MySQL Tools 8.4 LTS Community                                                                          1.4 MB/s | 414 kB     00:00
Dependencies resolved.
Nothing to do.
Complete!
```

기존 mysql 비활성화
```bash
[root@ip-172-31-40-180 username]# dnf module disable mysql
Last metadata expiration check: 0:00:35 ago on Thu 06 Mar 2025 05:33:38 AM UTC.
Dependencies resolved.
=======================================================================================================================================
 Package                         Architecture                   Version                          Repository                       Size
=======================================================================================================================================
Disabling modules:
 mysql

Transaction Summary
=======================================================================================================================================

Is this ok [y/N]: y
Complete!
```

```bash
[root@ip-172-31-40-180 username]# dnf repolist all | grep mysql
mysql-8.4-lts-community                      MySQL 8.4 LTS Community Se enabled
mysql-8.4-lts-community-debuginfo            MySQL 8.4 LTS Community Se disabled
mysql-8.4-lts-community-source               MySQL 8.4 LTS Community Se disabled
mysql-cluster-8.0-community                  MySQL Cluster 8.0 Communit disabled
mysql-cluster-8.0-community-debuginfo        MySQL Cluster 8.0 Communit disabled
mysql-cluster-8.0-community-source           MySQL Cluster 8.0 Communit disabled
mysql-cluster-8.4-lts-community              MySQL Cluster 8.4 LTS Comm disabled
mysql-cluster-8.4-lts-community-debuginfo    MySQL Cluster 8.4 LTS Comm disabled
mysql-cluster-8.4-lts-community-source       MySQL Cluster 8.4 LTS Comm disabled
mysql-cluster-innovation-community           MySQL Cluster Innovation R disabled
mysql-cluster-innovation-community-debuginfo MySQL Cluster Innovation R disabled
mysql-cluster-innovation-community-source    MySQL Cluster Innovation R disabled
mysql-connectors-community                   MySQL Connectors Community enabled
mysql-connectors-community-debuginfo         MySQL Connectors Community disabled
mysql-connectors-community-source            MySQL Connectors Community disabled
mysql-innovation-community                   MySQL Innovation Release C disabled
mysql-innovation-community-debuginfo         MySQL Innovation Release C disabled
mysql-innovation-community-source            MySQL Innovation Release C disabled
mysql-tools-8.4-lts-community                MySQL Tools 8.4 LTS Commun enabled
mysql-tools-8.4-lts-community-debuginfo      MySQL Tools 8.4 LTS Commun disabled
mysql-tools-8.4-lts-community-source         MySQL Tools 8.4 LTS Commun disabled
mysql-tools-community                        MySQL Tools Community      disabled
mysql-tools-community-debuginfo              MySQL Tools Community - De disabled
mysql-tools-community-source                 MySQL Tools Community - So disabled
mysql-tools-innovation-community             MySQL Tools Innovation Com disabled
mysql-tools-innovation-community-debuginfo   MySQL Tools Innovation Com disabled
mysql-tools-innovation-community-source      MySQL Tools Innovation Com disabled
mysql80-community                            MySQL 8.0 Community Server disabled
mysql80-community-debuginfo                  MySQL 8.0 Community Server disabled
mysql80-community-source                     MySQL 8.0 Community Server disabled
```

설치
```bash
[root@ip-172-31-40-180 username]# dnf -y install mysql-community-server
Last metadata expiration check: 0:01:52 ago on Thu 06 Mar 2025 05:33:38 AM UTC.
Dependencies resolved.
=======================================================================================================================================
 Package                                     Architecture        Version                    Repository                            Size
=======================================================================================================================================
Installing:
 mysql-community-server                      x86_64              8.4.4-1.el8                mysql-8.4-lts-community               61 M
     replacing  mariadb-backup.x86_64 3:10.3.39-1.module+el8.8.0+1452+2a7eab68
     replacing  mariadb-connector-c-config.noarch 3.1.11-2.el8_3
     replacing  mariadb-gssapi-server.x86_64 3:10.3.39-1.module+el8.8.0+1452+2a7eab68
     replacing  mariadb-server.x86_64 3:10.3.39-1.module+el8.8.0+1452+2a7eab68
     replacing  mariadb-server-utils.x86_64 3:10.3.39-1.module+el8.8.0+1452+2a7eab68
Installing dependencies:
 mysql-community-client                      x86_64              8.4.4-1.el8                mysql-8.4-lts-community               15 M
     replacing  mariadb.x86_64 3:10.3.39-1.module+el8.8.0+1452+2a7eab68
 mysql-community-client-plugins              x86_64              8.4.4-1.el8                mysql-8.4-lts-community              4.6 M
 mysql-community-common                      x86_64              8.4.4-1.el8                mysql-8.4-lts-community              692 k
 mysql-community-icu-data-files              x86_64              8.4.4-1.el8                mysql-8.4-lts-community              2.2 M
 mysql-community-libs                        x86_64              8.4.4-1.el8                mysql-8.4-lts-community              1.5 M

Transaction Summary
=======================================================================================================================================
Install  6 Packages

Total download size: 85 M
Downloading Packages:
(1/6): mysql-community-common-8.4.4-1.el8.x86_64.rpm                                                   2.6 MB/s | 692 kB     00:00
(2/6): mysql-community-icu-data-files-8.4.4-1.el8.x86_64.rpm                                            14 MB/s | 2.2 MB     00:00
(3/6): mysql-community-client-plugins-8.4.4-1.el8.x86_64.rpm                                            10 MB/s | 4.6 MB     00:00
(4/6): mysql-community-libs-8.4.4-1.el8.x86_64.rpm                                                      20 MB/s | 1.5 MB     00:00
(5/6): mysql-community-client-8.4.4-1.el8.x86_64.rpm                                                    19 MB/s |  15 MB     00:00
(6/6): mysql-community-server-8.4.4-1.el8.x86_64.rpm                                                    31 MB/s |  61 MB     00:01
---------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                   35 MB/s |  85 MB     00:02
MySQL 8.4 LTS Community Server                                                                         3.0 MB/s | 3.1 kB     00:00
Importing GPG key 0xA8D3785C:
 Userid     : "MySQL Release Engineering <mysql-build@oss.oracle.com>"
 Fingerprint: BCA4 3417 C3B4 85DD 128E C6D4 B7B3 B788 A8D3 785C
 From       : /etc/pki/rpm-gpg/RPM-GPG-KEY-mysql-2023
Key imported successfully
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                               1/1
  Running scriptlet: mysql-community-common-8.4.4-1.el8.x86_64                                                                     1/1
  Installing       : mysql-community-common-8.4.4-1.el8.x86_64                                                                    1/12
  Installing       : mysql-community-client-plugins-8.4.4-1.el8.x86_64                                                            2/12
  Installing       : mysql-community-libs-8.4.4-1.el8.x86_64                                                                      3/12
  Running scriptlet: mysql-community-libs-8.4.4-1.el8.x86_64                                                                      3/12
  Installing       : mysql-community-client-8.4.4-1.el8.x86_64                                                                    4/12
  Installing       : mysql-community-icu-data-files-8.4.4-1.el8.x86_64                                                            5/12
  Running scriptlet: mysql-community-server-8.4.4-1.el8.x86_64                                                                    6/12
  Installing       : mysql-community-server-8.4.4-1.el8.x86_64                                                                    6/12
  Running scriptlet: mysql-community-server-8.4.4-1.el8.x86_64                                                                    6/12
  Obsoleting       : mariadb-gssapi-server-3:10.3.39-1.module+el8.8.0+1452+2a7eab68.x86_64                                        7/12
  Obsoleting       : mariadb-backup-3:10.3.39-1.module+el8.8.0+1452+2a7eab68.x86_64                                               8/12
  Running scriptlet: mariadb-server-3:10.3.39-1.module+el8.8.0+1452+2a7eab68.x86_64                                               9/12
  Obsoleting       : mariadb-server-3:10.3.39-1.module+el8.8.0+1452+2a7eab68.x86_64                                               9/12
  Running scriptlet: mariadb-server-3:10.3.39-1.module+el8.8.0+1452+2a7eab68.x86_64                                               9/12
  Obsoleting       : mariadb-3:10.3.39-1.module+el8.8.0+1452+2a7eab68.x86_64                                                     10/12
  Obsoleting       : mariadb-connector-c-config-3.1.11-2.el8_3.noarch                                                            11/12
  Obsoleting       : mariadb-server-utils-3:10.3.39-1.module+el8.8.0+1452+2a7eab68.x86_64                                        12/12
  Running scriptlet: mariadb-server-utils-3:10.3.39-1.module+el8.8.0+1452+2a7eab68.x86_64                                        12/12
  Verifying        : mysql-community-client-8.4.4-1.el8.x86_64                                                                    1/12
  Verifying        : mariadb-3:10.3.39-1.module+el8.8.0+1452+2a7eab68.x86_64                                                      2/12
  Verifying        : mysql-community-client-plugins-8.4.4-1.el8.x86_64                                                            3/12
  Verifying        : mysql-community-common-8.4.4-1.el8.x86_64                                                                    4/12
  Verifying        : mysql-community-icu-data-files-8.4.4-1.el8.x86_64                                                            5/12
  Verifying        : mysql-community-libs-8.4.4-1.el8.x86_64                                                                      6/12
  Verifying        : mysql-community-server-8.4.4-1.el8.x86_64                                                                    7/12
  Verifying        : mariadb-backup-3:10.3.39-1.module+el8.8.0+1452+2a7eab68.x86_64                                               8/12
  Verifying        : mariadb-connector-c-config-3.1.11-2.el8_3.noarch                                                             9/12
  Verifying        : mariadb-gssapi-server-3:10.3.39-1.module+el8.8.0+1452+2a7eab68.x86_64                                       10/12
  Verifying        : mariadb-server-3:10.3.39-1.module+el8.8.0+1452+2a7eab68.x86_64                                              11/12
  Verifying        : mariadb-server-utils-3:10.3.39-1.module+el8.8.0+1452+2a7eab68.x86_64                                        12/12

Installed:
  mysql-community-client-8.4.4-1.el8.x86_64                      mysql-community-client-plugins-8.4.4-1.el8.x86_64
  mysql-community-common-8.4.4-1.el8.x86_64                      mysql-community-icu-data-files-8.4.4-1.el8.x86_64
  mysql-community-libs-8.4.4-1.el8.x86_64                        mysql-community-server-8.4.4-1.el8.x86_64

Complete!
```

```bash
sudo dnf install -y curl git unzip zip certbot python3-certbot-nginx
```

```bash
#!/bin/bash

# 명령어 실행 중 오류(비정상 종료)가 발생하면 즉시 스크립트를 종료
set -e

# 캐시 삭제
sudo dnf clean all
sudo dnf clean packages
sudo dnf autoremove


# EPEL 및 Remi 저장소 설치
echo "➡️ EPEL 및 Remi 저장소 설치 중..."
sudo dnf install -y epel-release
sudo dnf install -y dnf-utils
sudo dnf install -y http://rpms.remirepo.net/enterprise/remi-release-8.rpm

# 2. MySQL 기본 모듈 비활성화 (필요한 경우)
echo "➡️ 기본 MySQL 모듈 비활성화..."
sudo dnf module disable mysql -y

# 기존 PHP 모듈 비활성화
echo "➡️ 기존 PHP 모듈 초기화..."
sudo dnf module reset php -y

# PHP 8.4 모듈 활성화
echo "➡️ PHP 8.4 모듈 활성화..."
sudo dnf module enable php:remi-8.4 -y

# PHP 8.4 및 확장 모듈 설치
echo "➡️ PHP 8.4 및 확장 모듈 설치 중..."
sudo dnf install -y php php-cli php-fpm php-mysqlnd php-xml php-mbstring php-curl php-zip php-gd php-bcmath php-sqlite3

# PHP-FPM 서비스 시작 및 활성화
echo "➡️ PHP-FPM 서비스 시작..."
sudo systemctl enable --now php-fpm
```

mysql
```bash
mysqld --initialize-insecure --user=mysql

systemctl start mysqld

[root@ip-172-31-40-180 username]# mysql_secure_installation

Securing the MySQL server deployment.

Connecting to MySQL using a blank password.

VALIDATE PASSWORD COMPONENT can be used to test passwords
and improve security. It checks the strength of password
and allows the users to set only those passwords which are
secure enough. Would you like to setup VALIDATE PASSWORD component?

Press y|Y for Yes, any other key for No: y

There are three levels of password validation policy:

LOW    Length >= 8
MEDIUM Length >= 8, numeric, mixed case, and special characters
STRONG Length >= 8, numeric, mixed case, special characters and dictionary                  file

Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 0
Please set the password for root here.

New password:

Re-enter new password:

Estimated strength of the password: 50
Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) : y
By default, a MySQL installation has an anonymous user,
allowing anyone to log into MySQL without having to have
a user account created for them. This is intended only for
testing, and to make the installation go a bit smoother.
You should remove them before moving into a production
environment.

Remove anonymous users? (Press y|Y for Yes, any other key for No) : y
Success.


Normally, root should only be allowed to connect from
'localhost'. This ensures that someone cannot guess at
the root password from the network.

Disallow root login remotely? (Press y|Y for Yes, any other key for No) : y
Success.

By default, MySQL comes with a database named 'test' that
anyone can access. This is also intended only for testing,
and should be removed before moving into a production
environment.


Remove test database and access to it? (Press y|Y for Yes, any other key for No) : y
 - Dropping test database...
Success.

 - Removing privileges on test database...
Success.

Reloading the privilege tables will ensure that all changes
made so far will take effect immediately.

Reload privilege tables now? (Press y|Y for Yes, any other key for No) : y
Success.

All done!


[root@ip-172-31-40-180 username]# mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 10
Server version: 8.4.4 MySQL Community Server - GPL

Copyright (c) 2000, 2025, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>

```


https://docs.3rdeyesys.com/docs/database/mysql-mariadb/install/mysql-8-latest-version-install-on-rocky-linux/









composer 설치

```bash
cd ~  # 홈 디렉토리 이동
curl -sS https://getcomposer.org/installer | php


[root@ip-172-31-40-180 BrainTracer]# curl -sS https://getcomposer.org/installer | php
All settings correct for using Composer
Downloading...

Composer (version 2.8.6) successfully installed to: /home/username/BrainTracer/composer.phar
Use it: php composer.phar

[root@ip-172-31-40-180 BrainTracer]# composer -v
bash: composer: command not found
[root@ip-172-31-40-180 BrainTracer]# sudo mv /home/username/BrainTracer/composer.phar /usr/local/bin/composer
[root@ip-172-31-40-180 BrainTracer]# sudo chmod +x /usr/local/bin/composer
[root@ip-172-31-40-180 BrainTracer]# composer -v
bash: composer: command not found
[root@ip-172-31-40-180 BrainTracer]# composer -V
bash: composer: command not found
[root@ip-172-31-40-180 BrainTracer]# ls -l /usr/local/bin/composer
-rwxr-xr-x. 1 root root 3063015 Mar  6 07:44 /usr/local/bin/composer
[root@ip-172-31-40-180 BrainTracer]# echo $PATH
/sbin:/bin:/usr/sbin:/usr/bin
[root@ip-172-31-40-180 BrainTracer]# export PATH=$PATH:/usr/local/bin
[root@ip-172-31-40-180 BrainTracer]#
[root@ip-172-31-40-180 BrainTracer]# composer -V
Composer version 2.8.6 2025-02-25 13:03:50
PHP version 8.4.4 (/usr/bin/php)
Run the "diagnose" command to get more detailed diagnostics output.
[root@ip-172-31-40-180 BrainTracer]# echo 'export PATH=$PATH:/usr/local/bin' >> ~/.bashrc
[root@ip-172-31-40-180 BrainTracer]# source ~/.bashrc

```


```bash
sudo nano /etc/nginx/conf.d/default.conf


server {
    listen 80;
    listen [::]:80;
    server_name _;

    root /home/username/BrainTracer/public;
    index index.php index.html;

    client_max_body_size 500M;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_intercept_errors on;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_pass unix:/run/php-fpm/www.sock;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    error_page 404 /404.html;
    location = /404.html {
        root /home/username/BrainTracer/public;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /home/username/BrainTracer/public;
    }
}

```

```bash
sudo setsebool -P httpd_can_network_connect 1
sudo restorecon -Rv /home/username/BrainTracer/public

sudo systemctl restart nginx

```

```bash
sudo chown nginx:nginx /run/php-fpm/www.sock
sudo chmod 660 /run/php-fpm/www.sock


sudo nano /etc/php-fpm.d/www.conf
user = nginx
group = nginx
listen.owner = nginx
listen.group = nginx
listen.mode = 0660
sudo systemctl restart php-fpm


composer update
```