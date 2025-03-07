---
title: Ubuntu SSL/Certbot
author: Baek JinYoung
date: 2024-10-28
category: Jekyll
layout: post
---

Ubuntu certbot SSL 인증서 설치
-

### 방법 요약
```bash
# 시스템 패키지 목록 갱신 및 업그레이드
sudo apt update
sudo apt upgrade

# certbot과 python3-certbot-nginx 패키지 설치
sudo apt install certbot python3-certbot-nginx

# 설치 확인 질문
Do you want to continue? [Y/n] y

# SSL 인증서를 Nginx 웹 서버에 적용
sudo certbot --nginx -d [인증서를 적용할 도메인]

# 이메일 입력
Enter email address (used for urgent renewal and security notices)
 (Enter 'c' to cancel): [이메일 입력]
 
# 약관 동의 
(Y)es/(N)o: y

# 이메일 수신 여부 선택
(Y)es/(N)o: n

# 인증서 자동 갱신 설정
sudo systemctl enable certbot.timer

# 인증서 즉시 갱신
sudo systemctl start certbot.timer
```

설명에 들어가기 전에 __Certbot__ 에 대해 간단히 알아보자.

__Certbot__ 은 Let's encrypt를 이용해서 SSL 인증서를 발급, 갱신할 수 있게 도와주는 무료, 오픈소스 툴이다.    
__SSL(Secure Sockets Layer, 보안 소켓 계층)__ 은 전송되는 데이터를 암호화하여 인터넷 연결을 보호하기 위한 표준 기술이다.


### 1. 시스템 패키지 목록 갱신 및 업그레이드

```bash
sudo apt update
```

설치 전에 시스템의 패키지 목록을 최신 상태로 갱신한다.

__sudo__    
시스템의 관리자 권한으로 명령어를 실행하기 위해 사용한다.    
패키지 관리와 같이 시스템 파일을 변경하는 작업은 일반 사용자 권한으로는 수행할 수 없다.

__apt__    
apt는 패키지 관리자이다.    
Ubuntu와 같은 Debian 기반 시스템에서 패키지를 설치, 업데이트, 제거하는 데 사용한다.

__update__    
로컬에 저장된 패키지 목록을 최신 상태로 갱신한다.    
이때 실제 소프트웨어를 설치하거나 업그레이드하지는 않고, 패키지 목록만 업데이트한다.

위 명령어를 실행하면    
/etc/apt/sources.list 파일에 지정된 패키지 저장소를 참조하여 최신 패키지 목록을 다운로드한다.    
새로운 패키지가 추가되었거나 기존 패키지에 업데이트가 있는 경우 해당 정보를 로컬 캐시에 저장한다.

패키지 목록을 갱신한 뒤에는 아래의 명령어를 사용해 업그레이드한다.

```bash
sudo apt upgrade
```

__upgrade__    
로컬에 설치된 패키지 중 업데이트된 버전이 있는 패키지를 찾아 업그레이드한다.

위 명령어를 입력하기 전에 apt update를 해야 패키지가 업그레이드된다.


### 2. certbot과 python3-certbot-nginx 패키지 설치

```bash
sudo apt install certbot python3-certbot-nginx
```

__install__    
지정한 패키지를 시스템에 설치한다.

__certbot__    
Let's Encrypt에서 SSL 인증서를 발급하고 자동으로 갱신하도록 돕는 도구이다.    
Let's Encrypt는 무료로 SSL 인증서를 제공하고,    
certbot은 이 인증서를 발급하고 관리하는 CLI(명령줄 인터페이스) 프로그램이다.

__python3-certbot-ngninx__    
certbot이 Nginx 웹 서버와 통합될 수 있도록 지원하는 플러그인이다.    
Nginx 설정 파일을 자동으로 업데이트한다.    
이를 통해 수동으로 설정 파일을 수정할 필요 없이 certbot 멸영어만으로 SSL 인증서를 적용할 수 있다.

명령어를 입력하면 다음과 같은 메시지가 출력된다.

```bash
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  nginx nginx-common python3-acme python3-certbot python3-configargparse python3-icu python3-josepy
  python3-parsedatetime python3-rfc3339
Suggested packages:
  python-certbot-doc python3-certbot-apache fcgiwrap nginx-doc ssl-cert python-acme-doc python-certbot-nginx-doc
The following NEW packages will be installed:
  certbot nginx nginx-common python3-acme python3-certbot python3-certbot-nginx python3-configargparse python3-icu
  python3-josepy python3-parsedatetime python3-rfc3339
0 upgraded, 11 newly installed, 0 to remove and 29 not upgraded.
Need to get 1649 kB of archives.
After this operation, 7295 kB of additional disk space will be used.
Do you want to continue? [Y/n] y
```

설치에 필요한 파일 용량과 설치 후 시스템에서 사용할 디스크 공간을 알리고 설치를 계속할지 묻는 메시지이다.

y를 입력하거나 Enter를 누르면 설치를 계속 진행한다.    
n을 입력하면 설치가 취소된다.


### 3. SSL 인증서를 Nginx 웹 서버에 적용

```bash
sudo certbot --nginx -d [인증서를 적용할 도메인 이름]
```

지정한 도메인에 대한 SSL 인증서를 발급하고 Nginx 서버 설정에 자동으로 반영한다.

__--nginx__    
certbot이 Nginx와 통합되어 작용하게 하는 플러그인 옵션이다.    
certbot이 Nginx 설정 파일을 자동으로 수정해 SSL 인증서를 설치하고 HTTPS 설정을 활성화한다.

__-d__    
인증서를 발급받을 도메인 이름을 지정할 때 사용하는 옵션이다.    
여러 도메인을 지정할 수도 있다.    
각 도메인에 대해 인증서가 발급된다.

명령어를 실행하면 다음과 같은 메시지가 출력된다.

```bash
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Enter email address (used for urgent renewal and security notices)
 (Enter 'c' to cancel): [이메일 입력]
```

이 메시지는 certbot을 처음 실행할 때 나타나는 안내 메시지다.    
SSL 인증서 갱신 및 보안 알림을 수신할 이메일 주소를 요청한다.

__Saving debug log to /var/log/letsencrypt/letsencrypt.log__    
certbot은 인증서 발급 과정에서 발생하는 모든 정보를 /var/log/letsencrypt/letsencrypt.log 파일에 기록한다.    
문제가 발생하거나 인증서 발급이 실패했을 때 이 로그 파일을 통해 원인을 진단할 수 있다.


__Enter email address (used for urgent renewal and security notices)__    
인증서와 관련된 중요한 알림을 발송할 이메일 주소를 요청하는 문장이다.    
이 메시지는 다음과 같은 상황에서 활용된다.

인증서 갱신이 실패했을 경우 알림    
인증서가 만료되기 전 갱신 안내    
보안 관련 문제나 서비스 관련 공지        
Let's Encrypt 서비스 약관이 변경되었을 때 공지

__(Enter 'c' to cancel)__    
이메일 주소 입력을 원하지 않거나 작업을 취소하려면 c를 입력한다.    
다만 이메일 주소를 입력하지 않으면 보안 및 갱신 알림을 받을 수 없으며,     
이메일 주소 제공이 필수적인 경우 certbot 실행이 진행되지 않을 수 있다.


이메일을 입력하면 다음 메시지가 출력된다.

```bash
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please read the Terms of Service at https://letsencrypt.org/documents/LE-SA-v1.4-April-3-2024.pdf. You must agree in order to register with the ACME server. Do you agree?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: y
```

Let's Encrypt의 서비스 약관에 동의할 것을 요청하는 안내이다.    
Let's Encrypt에서 제공하는 SSL 인증서를 발급받으려면 이 약관에 동의해야 한다.

Terms of Service 링크에는 Let's Encrypt의 서비스 약관이 나와 있다.

__ACME 서버 등록__
Let's Encrypt는 ACME(Automatic Certificate Management Environment) 프로토콜을 사용하여 SSL 인증서를 발급한다.    
인증서를 받기 위해서는 ACME 서버에 등록해야 하며, 약관에 동의해야 등록할 수 있다.

y를 입력해 인증서 발급을 진행한다.    
인증서 발급 과정을 중단하고 싶을 경우 n을 입력한다.

y를 입력하면 다음 메시지가 출력된다.

```bash
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Would you be willing, once your first certificate is successfully issued, to share your email address with the Electronic Frontier Foundation, a founding partner of the Let's Encrypt project and the non-profit organization that develops Certbot? We'd like to send you email about our work encrypting the web, EFF news, campaigns, and ways to support digital freedom.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: n
```

이 메시지는 Electronic Frontier Foundation(EFF)에 이메일 주소를 공유할지 묻는 안내이다.    
Electronic Frontier Foundation(EFF)는 Let's Encrypt 프로젝트의 창립 파트너이자 certbot을 개발한 비영리 단체로,    
인터넷 보안을 강화하고 사용자 프라이버시를 보호하기 위한 여러 캠페인을 진행한다.

y를 입력하면 이메일 주소를 EFF와 공유하고 EFF 뉴스와 캠페인 관련 이메일을 수신하는 데 동의한다.    
선택 사항이므로 n을 입력해도 된다.

n을 입력하면 다음과 같은 과정을 거친다.

1. 도메인 소유 확인    
   certbot은 Let's Encrypt에 연결하여 지정한 도메인의 소유 여부를 확인한다.    
   이 과정에서 도메인에 대한 HTTP 요청을 생성하여 Let's Encrypt가 이를 확인하도록 한다.

2. 인증서 발급    
   도메인 소유가 확인되면 Let's Encrypt가 SSL 인증서를 발급한다.

3. Nginx 설정 업데이트    
   --nginx 옵션을 사용했기 때문에 certbot이 자동으로 Nginx 설정 파일을 편집하여 새로 발급된 인증서를 적용하고 HTTPS를 활성화한다.


인증서가 성공적으로 발급되면 다음과 같은 메시지가 출력된다.

```bash
Account registered.
Requesting a certificate for [인증서 발급을 신청한 도메인 이름]

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/[인증서 발급을 신청한 도메인 이름]/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/[인증서 발급을 신청한 도메인 이름]/privkey.pem
This certificate expires on 2024-08-28.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Deploying certificate
Successfully deployed certificate for [인증서 발급을 신청한 도메인 이름] to /etc/nginx/sites-enabled/default
Congratulations! You have successfully enabled HTTPS on https://[인증서 발급을 신청한 도메인 이름]
We were unable to subscribe you the EFF mailing list because your e-mail address appears to be invalid. You can try again later by visiting https://act.eff.org.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
* Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
* Donating to EFF:                    https://eff.org/donate-le
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

### 4. 자동 갱신 설정

Let's Encrypt 인증서 90일 동안 유효하다.    
certbot.timer라는 타이머 유닛을 활성화해서 Let's Encrypt의 SSL 인증서를 자동으로 갱신하도록 설정하자.

```bash
sudo systemctl enable certbot.timer
```

__systemctl__    
시스템 및 서비스 관리 명령어이다.    
시스템에서 서비스를 시작, 중지, 활성화, 비활성화하는 등의 작업을 수행할 수 있다.

__enable__    
타이머 유닛을 활성화하는 옵션이다.    
enable을 사용하면 시스템 부팅 시 자동으로 타이머가 실행되도록 설정된다.

__cerbot.timer__    
certbot을 주기적으로 실행시키기 위한 타이머 유닛이다.    
이 타이머는 certbot.service를 정기적으로 트리거하여 인증서 갱신 작업을 자동으로 수행하도록 한다.    
SSL 인증서가 갱신되면 웹 사이트가 항상 유효한 HTTPS 연결을 유지할 수 있다.

명령어를 실행하면 시스템 부팅 시 certbot.timer가 자동으로 시작되며,    
이후 주기적으로 certbot renew 명령이 실행된다.    
certbot.timer는 보통 매일 한 번씩 실행되며, 만료 기간이 임박한 인증서가 있을 경우 자동으로 갱신을 수행한다.    
이미 유효한 인증서는 갱신하지 않는다.

타이머가 정상적으로 설정되었는지 확인하려면 다음 명령어를 사용한다.


```bash
sudo systemctl list-timers
```

이 명령어를 사용하면 주기적으로 실행되는 작업의 일정과 현재 상태를 확인할 수 있다.

__list-timers__    
시스템에서 설정된 모든 타이머 유닛의 목록을 보여주는 옵션이다.    
이 옵션을 사용하면 각 타이머의 상태, 다음 실행 시간, 마지막 실행 시간 등을 확인할 수 있다.

인증서를 갱신해 보자.

```bash
sudo systemctl start certbot.timer
```

__start__    
지정한 유닛을 즉시 시작하는 옵션이다.

명령어를 실행하면 다음과 같은 결과가 나타난다.

1. 타이머 시작    
   certbot.timer가 즉시 활성화되어 설정한 주기로 certbot이 실행되기 시작한다.

2. 인증서 갱신    
   타이머가 활성화된 후에는 certbot이 자동으로 SSL 인증서를 갱신하려고 시도한다.    
   이미 유효한 인증서에 대해서는 갱신을 수행하지 않는다.

3. 로그 기록    
   타이머 실행 결과는 로그에 기록된다.

참고한 글
1. [sudo apt update/upgrade](https://velog.io/@akfvh/sudoApt-vduqb7mk)
2. [Deployment](https://laravel.com/docs/11.x/deployment#nginx)

Ubuntu certbot SSL 인증서에 도메인 추가, 삭제, 수정하기
-

### 방법 요약

```bash
# 발급한 인증서 확인
sudo certbot certificates

# 도메인 추가
sudo certbot certonly --cert-name [인증서 이름] -d [추가할 도메인 이름1] -d [추가할 도메인 이름2] ...

# 인증 수단 선택(1은 Nginx)
Select the appropriate number [1-3] then [enter] (press 'c' to cancel): 1

# 업데이트 확인(c는 취소)
(U)pdate certificate/(C)ancel: u
```

### 1. 인증서 이름과 도메인 찾기    

인증서의 도메인 목록을 수정하기 전에 어떤 인증서를 건드릴지, 그 인증서에는 어떤 도메인이 포함되어 있는지 확인한다.    

```bash
sudo certbot certificates
```

Certbot이 관리하는 SSL/TSL 인증서들의 상세 정보를 조회할 때 사용하는 명령어이다.    
이 명령어를 통해 발급받은 인증서의 상태, 만료일, 경로 등을 확인할 수 있다.    

root 권한이 필요하므로 sudo를 붙여 실행한다.    

명령어를 실행하면 다음과 같은 정보가 출력된다.    

도메인을 바꾸고 싶은 인증서의 이름(Certificate Name)과 도메인 목록(Domains)을 확인한다.    

```bash
Saving debug log to /var/log/letsencrypt/letsencrypt.log

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Found the following certs:
  Certificate Name: [인증서 이름]
    Serial Number: [인증서 고유 일련번호]
    Key Type: [인증서 키의 암호화 알고리즘 유형]
    Domains: [인증서가 유효한 도메인 목록]
    Expiry Date: [인증서의 만료 날짜] [만료되기 전에 갱신해야 하는 일 수]
    Certificate Path: /etc/letsencrypt/live/[도메인 이름]/fullchain.pem # 인증서 파일의 위치
    Private Key Path: /etc/letsencrypt/live/[도메인 이름]/privkey.pem # 비밀 키 파일의 위치
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

__Certificate File(fullchain.pem 또는 cert.pem)__    
클라이언트와 서버 간의 암호화 연결을 설정하는 데 사용되는 인증서 파일이다.    
fullchain.pem 파일은 서버 인증서와 체인 인증서가 모두 포함된 파일이다.    

__Private Key(privkey.pem)__    
인증서와 쌍을 이루는 비밀 키 파일이다.    
이 파일은 서버만 보관하고 외부에 공개되지 않는다.    
인증서와 함께 SSL 통신을 설정하는 데 사용한다.    

기본적으로 Certbot은 __/etc/letsencrypt/live/[도메인 이름]/__ 경로에 인증서 파일을 저장한다.    
이 경로는 인증서를 발급받을 때 터미널에 출력되며,    
이후 웹 서버 설정 파일에서 이를 참조하여 SSL 연결을 설정한다.    

### 2. 인증서 도메인 수정    

인증서를 수정할 때 사용하는 커맨드는 아래와 같다.    


```bash
sudo certbot certonly --cert-name [인증서 이름] -d [추가하고 싶은 도메인1] -d [추가하고 싶은 도메인2] ...
```


기존 인증서에 새로운 도메인을 추가하거나 업데이트할 때 사용하는 Certbot 명령어이다.    
인증서를 발급받거나 갱신할 때 사용한다.    


__certonly__    
인증서를 발급만 받고 웹 서버 설정은 자동으로 변경하지 않도록 하는 옵션이다.    
이 옵션을 사용하면 인증서 발급 후 웹 서버 설정은 수동으로 구성해야 한다.    

__--cert-name [인증서 이름]__    
Certbot이 발급한 기존 인증서 이름을 지정한다.    
이 이름을 통해 Certbot이 특정 인증서를 식별한다.    

__-d [추가하고 싶은 도메인]__    
추가할 도메인 이름을 지정한다.    
여러 도메인을 추가할 수 있으며, 각 도메인 앞에 -d 옵션을 붙인다.    
이렇게 추가된 도메인들은 지정된 인증서 이름으로 발급된 인증서에 포함된다.    
인증서에서 제외하고 싶은 도메인이 있다면 해당 도메인은 입력하지 않는다.    

이 명령어를 실행할 때에는 __전체 도메인 목록__ 을 명시해야 한다.
웹 서버가 인증서를 사용 중이라면 새로운 도메인을 추가한 뒤 웹 서버 설정을 업데이트하고 재시작해야 변경 사항이 적용된다.

위 커맨드를 입력하면 인증서를 처음 발급받았을 때처럼 아래의 메시지가 나온다.    

```bash
Saving debug log to /var/log/letsencrypt/letsencrypt.log

How would you like to authenticate with the ACME CA?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: Nginx Web Server plugin (nginx)
2: Runs an HTTP server locally which serves theessary validation files under the /.well-known/acme-challenge/ request path. Suitable if there is no HTTP server already running. HTTP challenge only (wildcards not supported). (standalone)
3: Saves the necessary validation files to a .well-known/acme-challenge/directory within the nominated webroot path. A seperate HTTP server must be running and serving files from the webroot path. HTTP challenge only (wildcards not supported). (webroot)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate number [1-3] then [enter] (press 'c' to cancel): 1
```

Certbot이 ACME 인증기관 CA와 통신할 때 사용할 인증 방식을 선택하라는 안내이다.    
3가지 인증 방식 중 하나를 선택해 도메인 소유권을 증명해야 SSL 인증서가 발급된다.    

선택할 수 있는 옵션은 다음과 같다.    

1. Nginx Web Server plugin (nginx)    
   __Nginx__ 웹 서버 플러그인을 사용해 자동으로 도메인 인증 파일을 서버에 올리고 인증을 수행하는 방식이다.    


2. Standalone    
   Certbot이 자체 HTTP 서버를 열어 인증을 수행한다.    
   현재 __웹 서버가 없거나 다른 웹 서버를 일시적으로 중지할 수 있을 때__ 사용한다.    
   HTTP 서버를 일시적으로 열어 /.well-known/acme-challenge/ 경로로 인증 파일을 제공한다.    
   와일드카드 인증서는 지원하지 않는다.

3. Webroot    
   이미 실행 중인 웹 서버가 있는 경우, 지정한 webroot 경로에 인증 파일을 저장하여 도메인 인증을 수행한다.    
   웹 서버가 Apache, Nginx 등과 함께 작동 중이며, 인증 파일을 제공할 __디렉터리 경로를 직접 지정하고 싶을 때__ 유용하다.    
   와일드카드 인증서는 지원하지 않는다.    
   .well-known/acme-challenge/ 디렉터리가 있어야 한다.    

입력창에서 인증 방식을 숫자로 선택하고 엔터 키를 누르면 다음 단계로 진행된다.    

나는 nginx를 사용하기 때문에 1을 선택했다.    

그러면 아래와 같이 도메인을 추가하거나 삭제하는 것이 맞는지 확인하는 메시지가 나온다.    

```bash
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
You are updating certificate [인증서 이름] to include new domain(s):
+ [도메인 이름]

You are also removing previously included domain(s):
(None)

Did you intend to make this change?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(U)pdate certificate/(C)ancel: u
```

include new domain 다음에 나열되는 도메인을 도메인 목록에 추가하고,    
removinig previously included domain 다음에 나열되는 도메인을 도메인 목록에서 제거하는 것이 맞냐고 물어보는 것이다.    

맞다면 u를 입력해 인증서를 업데이트하고, 틀리다면 c를 입력해 취소한다.    

u를 입력하면 다음과 같이 인증서가 갱신되었다는 메시지가 나온다.    

```bash
Renewing an existing certificate for [도메인 이름1] and [도메인 이름2]

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/[도메인 이름]/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/[도메인 이름]/privkey.pem
This certificate expires on 2025-01-26.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

These files will be updated when the certificate renews.    
Certbot has set up a scheduled task to automatically renew this certificate in the background.    

위 두 문장은 Certbot이 이 인증서를 자동으로 갱신하기 위한 예약 작업을 설정했다는 의미이다.    
내가 자동 갱신을 설정했기 때문에 나오는 메시지다.    

### 3. 웹 서버 재시작하기

Nginx를 사용할 경우 다음 명령어를 사용한다.    

```bash
sudo systemctl restart nginx
```


참고한 글
1. [certbot SSL 인증서에 도메인 추가/삭제/수정](https://blog.orbithv.dev/certbot-domain-edit)
