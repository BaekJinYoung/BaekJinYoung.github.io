---
title: SSL/Certbot
author: Baek JinYoung
date: 2024-10-28
category: Jekyll
layout: post
---

certbot SSL 인증서에 도메인 추가, 삭제, 수정하기
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
2: Runs an HTTP server locally which serves the necessary validation files under the /.well-known/acme-challenge/ request path. Suitable if there is no HTTP server already running. HTTP challenge only (wildcards not supported). (standalone)
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
