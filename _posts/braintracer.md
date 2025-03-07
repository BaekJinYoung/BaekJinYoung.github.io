
1. 사용자 추가
```bash
# Root 유저 전환
sudo su

# 유저 생성, username 자리에 원하시는 사용자 이름을 입력하세요.
# 이후 언급되는 username은 모두 이때 설정한 사용자 이름으로 입력하셔야 합니다.
adduser username

# 생성된 유저 확인
ls -ahil /home/
```

```bash
[root@ip-172-31-40-180 ec2-user]# ls -ahil /home/
total 0
 4194495 drwxr-xr-x.  6 root     root      62 Mar  6 02:50 .
     128 dr-xr-xr-x. 17 root     root     224 Apr 19  2023 ..
12587639 drwx------.  3 ec2-user ec2-user  95 Mar  6 02:41 ec2-user
     143 drwx------.  2 username username  62 Mar  6 02:47 username
```

비밀번호 설정
```bash
passwd username
```

```bash
[root@ip-172-31-40-180 ec2-user]# passwd username
Changing password for user username.
New password:
Retype new password:
passwd: all authentication tokens updated successfully.
```

https://hwang890.tistory.com/entry/Rocky-Linux-User-Group-%EA%B4%80%EB%A6%AC

2. nano 설치
```bash
sudo dnf update -y
```
```bash
[root@ip-172-31-40-180 username]# sudo dnf update -y
Last metadata expiration check: 1:22:04 ago on Thu 06 Mar 2025 02:48:16 AM UTC.
Dependencies resolved.
Nothing to do.
Complete!
```

```bash
sudo dnf install nano -y
```

```bash
[root@ip-172-31-40-180 username]# sudo dnf install nano -y
Last metadata expiration check: 1:22:35 ago on Thu 06 Mar 2025 02:48:16 AM UTC.
Dependencies resolved.
===============================================================================================================
 Package               Architecture            Version                           Repository               Size
===============================================================================================================
Installing:
 nano                  x86_64                  2.9.8-3.el8_10                    baseos                  580 k

Transaction Summary
===============================================================================================================
Install  1 Package

Total download size: 580 k
Installed size: 2.2 M
Downloading Packages:
nano-2.9.8-3.el8_10.x86_64.rpm                                                 548 kB/s | 580 kB     00:01
---------------------------------------------------------------------------------------------------------------
Total                                                                          344 kB/s | 580 kB     00:01
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                       1/1
  Installing       : nano-2.9.8-3.el8_10.x86_64                                                            1/1
  Running scriptlet: nano-2.9.8-3.el8_10.x86_64                                                            1/1
  Verifying        : nano-2.9.8-3.el8_10.x86_64                                                            1/1

Installed:
  nano-2.9.8-3.el8_10.x86_64

Complete!
```
https://hoganhost.com.ng/blog/server/alma-linux/how-to-install-nano-editor-on-almalinux-or-rocky-linux-9-8/

3. swap 폴더 설정
```bash
free -h
```
```bash
[ec2-user@ip-172-31-40-180 ~]$ free -h
              total        used        free      shared  buff/cache   available
Mem:          767Mi       602Mi        50Mi        13Mi       115Mi        45Mi
Swap:            0B          0B          0B
```

```bash
sudo dd if=/dev/zero of=/swapfile bs=4M count=512
```
```bash
#Swap 파일 생성
#bs=4M (4MB 블록 크기)로 조정하여 메모리 사용량을 줄임.
#**count=512**로 설정하여 4MB × 512 = 2GB Swap 파일 생성.
[ec2-user@ip-172-31-40-180 ~]$ sudo dd if=/dev/zero of=/swapfile bs=4M count=512
512+0 records in
512+0 records out
2147483648 bytes (2.1 GB, 2.0 GiB) copied, 15.2014 s, 141 MB/s
```

```bash
#Swap 파일 권한 설정
sudo chmod 600 /swapfile
```

```bash
sudo mkswap /swapfile
```
```bash
#Swap 영역으로 포맷
[ec2-user@ip-172-31-40-180 ~]$ sudo mkswap /swapfile
Setting up swapspace version 1, size = 2 GiB (2147479552 bytes)
no label, UUID=f899771d-86a2-43c7-b381-1dad430bedb8
```

```bash
#Swap 활성화
sudo swapon /swapfile
```

```bash
swapon --show
```
```bash
[ec2-user@ip-172-31-40-180 ~]$ swapon --show
NAME      TYPE SIZE USED PRIO
/swapfile file   2G   0B   -2
```

```bash
free -h
```
```bash
[ec2-user@ip-172-31-40-180 ~]$ free -h
              total        used        free      shared  buff/cache   available
Mem:          767Mi       602Mi        58Mi        13Mi       106Mi        49Mi
Swap:         2.0Gi          0B       2.0Gi
```

```bash
# Swap을 영구적으로 적용 (재부팅 후에도 유지)
echo '/swapfile swap swap defaults 0 0' | sudo tee -a /etc/fstab
```

```bash
[ec2-user@ip-172-31-40-180 ~]$ sudo dd if=/dev/zero of=/swapfile bs=128M count=16
dd: memory exhausted by input buffer of size 134217728 bytes (128 MiB)
```

3. ssh 설정
```bash

```
4. ftp 설치
```bash

```
5. install.sh 실행
```bash

```



6. nginx 설정
```bash
sudo nano /etc/nginx/conf.d/default.conf
```
```bash
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
}

```
7. mysql 설정
```bash

```
8. .env 설정
```bash
cd /home/username/project

php artisan key:generate

[root@ip-172-31-40-180 BrainTracer]# php artisan migrate

   WARN  The database 'braintracer' does not exist on the 'mysql' connection.

 ┌ Would you like to create it? ────────────────────────────────┐
 │ Yes                                                          │
 └──────────────────────────────────────────────────────────────┘

   INFO  Preparing database.

  Creating migration table .......................................................... 69.97ms DONE

   INFO  Running migrations.

  0001_01_01_000000_create_users_table ............................................. 183.39ms DONE
  0001_01_01_000001_create_cache_table .............................................. 69.34ms DONE
  0001_01_01_000002_create_jobs_table .............................................. 122.69ms DONE
  2024_10_29_013046_add_two_factor_columns_to_users_table .......................... 222.73ms DONE
  2024_10_29_013115_create_personal_access_tokens_table ............................. 58.18ms DONE
  2024_10_29_020221_create_popups_table ............................................. 24.51ms DONE
  2024_10_29_042418_create_banners_table ............................................ 25.33ms DONE
  2024_10_29_043521_create_companies_table .......................................... 26.35ms DONE
  2024_10_29_053916_create_inquiries_table .......................................... 28.48ms DONE
  2024_10_29_060639_create_histories_table .......................................... 25.16ms DONE
  2024_10_29_072235_create_visitors_table ........................................... 26.78ms DONE
  2024_10_29_072239_create_visitor_logs_table ....................................... 29.96ms DONE
  2024_10_29_072552_create_blocks_table ............................................. 30.35ms DONE

```
```bash

```
```bash

```